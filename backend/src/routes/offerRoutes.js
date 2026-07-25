const express = require('express');
const {
  listOffers,
  getOffer,
  createOffer,
  updateOffer,
  deleteOffer,
  myOffers,
  districtAverages
} = require('../controllers/offerController');
const { validate } = require('../middleware/validation');
const { offerSchema, offerUpdateSchema } = require('../utils/validationSchemas');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/', listOffers);
router.get('/averages', districtAverages);
router.get('/mine', authenticate, myOffers);
router.get('/:id', getOffer);
router.post('/', authenticate, validate(offerSchema), createOffer);
router.put('/:id', authenticate, validate(offerUpdateSchema), updateOffer);
router.delete('/:id', authenticate, deleteOffer);

module.exports = router;
