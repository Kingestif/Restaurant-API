const express = require('express');
const router = express.Router();
const {placeOrder, getOrder, getAllOrders} = require('../controllers/orderController');
const {protect, isCustomer, isManager} = require('../middlewares/userVerification');

/**
 * @swagger
 * /api/v1/order:
 *   post:
 *     summary: Place a new order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - product
 *                     - quantity
 *                   properties:
 *                     product:
 *                       type: string
 *                       description: Menu item ID
 *                     quantity:
 *                       type: number
 *     responses:
 *       200:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Successfuly placed an order
 *       500:
 *         description: Failed to place an order
 *
 *   get:
 *     summary: Get orders placed by the current user
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user's orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Successfuly fetched users order
 *                 data:
 *                   type: array
 *       500:
 *         description: Failed to fetch user's orders
 */
router.route('/').post(protect, isCustomer, placeOrder).get(protect, isCustomer, getOrder);

/**
 * @swagger
 * /api/v1/order/all:
 *   get:
 *     summary: Get all orders (manager only)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Successfuly fetched all orders
 *                 data:
 *                   type: array
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden - only managers allowed
 *       500:
 *         description: Failed to fetch orders
 */
router.route('/all').get(protect, isManager, getAllOrders);

export default router;