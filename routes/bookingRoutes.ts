import express from 'express';
const router = express.Router();
import { bookTable, getMyBookings, getAllBookings } from '../controllers/bookingController';
import { protectPrisma, checkRole } from '../middlewares/userVerification';

/**
 * @swagger
 * /api/v1/booking:
 *   post:
 *     summary: Book a table
 *     description: Allows a logged-in customer to book a table for a future date and time.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - time
 *               - numberOfPeople
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-10"
 *               time:
 *                 type: string
 *                 format: time
 *                 example: "18:30"
 *               numberOfPeople:
 *                 type: integer
 *                 example: 4
 *     responses:
 *       200:
 *         description: Successfully booked a table
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
 *                   example: Successfully booked a table
 *       400:
 *         description: Missing or invalid input data
 *       409:
 *         description: Duplicate booking exists
 *       500:
 *         description: Internal server error
 * 
 *   get:
 *     summary: Get all bookings
 *     description: Allows a manager to view all table bookings.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 results:
 *                   type: integer
 *                   example: 5
 *                 bookings:
 *                   type: array
 *       403:
 *         description: Forbidden - only managers allowed
 *       500:
 *         description: Internal server error
 */
router.route('/').post(protectPrisma, checkRole(['customer']), bookTable).get(protectPrisma, checkRole(['manager']), getAllBookings);
router.route('/me').get(protectPrisma, checkRole(['customer']), getMyBookings);

export default router;