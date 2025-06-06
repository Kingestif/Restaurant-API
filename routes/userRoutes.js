const express = require('express');
const router = express.Router();
const {viewAllUsers, viewUserProfile, updateUserRole, deleteUser} = require('../controllers/userController');

router.route('/').get(viewAllUsers);
router.route('/:id').get(viewUserProfile);
router.route('/:id').patch(updateUserRole);
router.route('/:id').delete(deleteUser);

module.exports = router;