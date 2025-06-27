import { checkRole } from "../middlewares/userVerification";

const express = require('express');
const router = express.Router();
const {viewAllUsers, viewUserProfile, updateUserRole, deleteUser} = require('../controllers/userController');
const {protect} = require('../middlewares/userVerification');

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
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
 *                   example: Users fetched successfully
 *                 data:
 *                   type: array
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - only admins allowed
 *       500:
 *         description: Failed to fetch users
 */
router.route('/').get(protect, checkRole(['admin']), viewAllUsers);

/**
 * @swagger
 * /api/v1/user/{id}:
 *   get:
 *     summary: View a user's profile (admin only)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile fetched successfully
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
 *                   example: Users profile fetched successfully
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       403:
 *         description: Forbidden - only admins allowed
 *       500:
 *         description: Failed to fetch the user
 * 
 *   patch:
 *     summary: Update a user's role or profile (admin only)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               role: manager
 *     responses:
 *       200:
 *         description: User profile updated successfully
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
 *                   example: Users profile updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - only admins allowed
 *       500:
 *         description: Failed to update user
 * 
 *   delete:
 *     summary: Delete a user by ID (admin only)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully (no content)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - only admins allowed
 *       500:
 *         description: Failed to delete user
 */
router.route('/:id').get(protect, checkRole(['admin']), viewUserProfile).patch(protect, checkRole(['admin']), updateUserRole).delete(protect, checkRole(['admin']), deleteUser);

export default router;