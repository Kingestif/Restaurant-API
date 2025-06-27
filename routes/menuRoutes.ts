import { checkRole } from "../middlewares/userVerification";

const express = require('express');
const router = express.Router();
const {getMenu, postMenu, editMenu, deleteMenu} = require('../controllers/menuController');
const {protect} = require('../middlewares/userVerification');

/**
 * @swagger
 * /api/v1/menu:
 *   get:
 *     summary: Get all menu items
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched all menus
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
 *                   example: Successfully fetched all menus
 *                 data:
 *                   type: array
 *       500:
 *         description: Server error
 *
 *   post:
 *     summary: Create a new menu item
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               available:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Successfully created new menu
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
 *                   example: Successfully created new menu
 *       400:
 *         description: Bad request (missing name or price)
 *       500:
 *         description: Server error
 */
router.route('/').get(protect, getMenu).post(protect, checkRole(['manager']), postMenu);

/**
 * @swagger
 * /api/v1/menu/{id}:
 *   patch:
 *     summary: Edit a menu item
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the menu item to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               available:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Menu updated successfully
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
 *                   example: Menu updated successfully
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete a menu item
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the menu item to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Menu item deleted successfully (no content)
 *       500:
 *         description: Failed to delete menu
 */
router.route('/:id').patch(protect, checkRole(['manager']), editMenu).delete(protect, checkRole(['manager']), deleteMenu);

export default router;  
