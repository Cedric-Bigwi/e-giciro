const express = require('express');
const { listUsers, listAllOffers, deleteUser, deleteOfferAsAdmin, stats } = require('../controllers/adminController');
const { authenticate, requireRole } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate, requireRole('admin'));
router.get('/stats', stats);
router.get('/users', listUsers);
router.delete('/users/:id', deleteUser);
router.get('/offers', listAllOffers);
router.delete('/offers/:id', deleteOfferAsAdmin);

module.exports = router;
