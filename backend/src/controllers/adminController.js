const { User, Offer } = require('../models');
const { success } = require('../utils/helpers');

async function listUsers(req, res, next) {
  try {
    const users = await User.findAll({ order: [['created_at', 'DESC']] });
    return success(res, { users: users.map((u) => u.toSafeJSON()) });
  } catch (err) {
    next(err);
  }
}

async function listAllOffers(req, res, next) {
  try {
    const offers = await Offer.findAll({
      include: [{ model: User, as: 'owner', attributes: ['id', 'name', 'phone_number', 'role', 'district'] }],
      order: [['created_at', 'DESC']]
    });
    return success(res, { offers });
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    if (user.role === 'admin') {
      return res.status(400).json({ success: false, message: 'Admin accounts cannot be deleted.' });
    }
    await user.destroy();
    return success(res, null, 'User deleted successfully.');
  } catch (err) {
    next(err);
  }
}

async function deleteOfferAsAdmin(req, res, next) {
  try {
    const offer = await Offer.findByPk(req.params.id);
    if (!offer) return res.status(404).json({ success: false, message: 'Offer not found.' });
    await offer.destroy();
    return success(res, null, 'Offer removed successfully.');
  } catch (err) {
    next(err);
  }
}

async function stats(req, res, next) {
  try {
    const [totalUsers, totalOffers, activeOffers, districts] = await Promise.all([
      User.count(),
      Offer.count(),
      Offer.count({ where: { status: 'active' } }),
      Offer.aggregate('district', 'DISTINCT', { plain: false })
    ]);

    return success(res, {
      totalUsers,
      totalOffers,
      activeOffers,
      districtsCovered: districts.length
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { listUsers, listAllOffers, deleteUser, deleteOfferAsAdmin, stats };
