const express = require('express');
const router = express.Router();
const {placeOrder, getOrder, getAllOrders} = require('../controllers/orderController');
const {protect} = require('../middlewares/userVerification');

router.route('/').post(protect, placeOrder);
router.route('/').get(protect, getOrder);
router.route('/all').get(protect, getAllOrders);

module.exports = router;