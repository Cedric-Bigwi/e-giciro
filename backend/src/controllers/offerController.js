const { Op, fn, col } = require('sequelize');
const { Offer, User, Notification } = require('../models');
const { success, paginate } = require('../utils/helpers');

async function listOffers(req, res, next) {
  try {
    const { product_name, category, district, type, min_price, max_price, sort } = req.query;
    const { page, limit, offset } = paginate(req.query);

    const where = { status: 'active' };
    if (product_name) where.product_name = { [Op.like]: `%${product_name}%` };
    if (category) where.category = category;
    if (district) where.district = district;
    if (type) where.type = type;
    if (min_price || max_price) {
      where.price = {};
      if (min_price) where.price[Op.gte] = Number(min_price);
      if (max_price) where.price[Op.lte] = Number(max_price);
    }

    let order = [['created_at', 'DESC']];
    if (sort === 'price_asc') order = [['price', 'ASC']];
    if (sort === 'price_desc') order = [['price', 'DESC']];

    const { rows, count } = await Offer.findAndCountAll({
      where,
      include: [{ model: User, as: 'owner', attributes: ['id', 'name', 'phone_number', 'role', 'district'] }],
      order,
      limit,
      offset
    });

    return success(res, {
      offers: rows,
      pagination: { page, limit, total: count, totalPages: Math.ceil(count / limit) }
    });
  } catch (err) {
    next(err);
  }
}

async function getOffer(req, res, next) {
  try {
    const offer = await Offer.findByPk(req.params.id, {
      include: [{ model: User, as: 'owner', attributes: ['id', 'name', 'phone_number', 'role', 'district'] }]
    });
    if (!offer) return res.status(404).json({ success: false, message: 'Offer not found.' });
    return success(res, { offer });
  } catch (err) {
    next(err);
  }
}

async function createOffer(req, res, next) {
  try {
    const offer = await Offer.create({ ...req.body, user_id: req.user.id });

    // Naive matching: notify other users with an opposite-type offer for the
    // same product/category in the same district.
    const oppositeType = offer.type === 'buy' ? 'sell' : 'buy';
    const matches = await Offer.findAll({
      where: {
        type: oppositeType,
        category: offer.category,
        district: offer.district,
        status: 'active',
        user_id: { [Op.ne]: req.user.id }
      },
      limit: 20
    });

    if (matches.length > 0) {
      const uniqueUserIds = [...new Set(matches.map((m) => m.user_id))];
      await Notification.bulkCreate(
        uniqueUserIds.map((uid) => ({
          user_id: uid,
          message: `A new ${offer.type} offer for ${offer.product_name} was posted in ${offer.district}.`
        }))
      );
    }

    const withOwner = await Offer.findByPk(offer.id, {
      include: [{ model: User, as: 'owner', attributes: ['id', 'name', 'phone_number', 'role', 'district'] }]
    });

    return success(res, { offer: withOwner }, 'Offer posted successfully.', 201);
  } catch (err) {
    next(err);
  }
}

async function updateOffer(req, res, next) {
  try {
    const offer = await Offer.findByPk(req.params.id);
    if (!offer) return res.status(404).json({ success: false, message: 'Offer not found.' });

    if (offer.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'You can only edit your own offers.' });
    }

    await offer.update(req.body);
    return success(res, { offer }, 'Offer updated successfully.');
  } catch (err) {
    next(err);
  }
}

async function deleteOffer(req, res, next) {
  try {
    const offer = await Offer.findByPk(req.params.id);
    if (!offer) return res.status(404).json({ success: false, message: 'Offer not found.' });

    if (offer.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'You can only delete your own offers.' });
    }

    await offer.destroy();
    return success(res, null, 'Offer deleted successfully.');
  } catch (err) {
    next(err);
  }
}

async function myOffers(req, res, next) {
  try {
    const offers = await Offer.findAll({
      where: { user_id: req.user.id },
      order: [['created_at', 'DESC']]
    });
    return success(res, { offers });
  } catch (err) {
    next(err);
  }
}

async function districtAverages(req, res, next) {
  try {
    const { category } = req.query;
    const where = { status: 'active' };
    if (category) where.category = category;

    const rows = await Offer.findAll({
      where,
      attributes: ['district', [fn('AVG', col('price')), 'average_price'], [fn('COUNT', col('id')), 'offer_count']],
      group: ['district']
    });

    return success(res, { averages: rows });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listOffers,
  getOffer,
  createOffer,
  updateOffer,
  deleteOffer,
  myOffers,
  districtAverages
};
