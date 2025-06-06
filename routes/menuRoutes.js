const express = require('express');
const router = express.Router();
const {getMenu, postMenu, editMenu, deleteMenu} = require('../controllers/menuController');

router.route('/').get(getMenu);
router.route('/').post(postMenu);
router.route('/:id').patch(editMenu);
router.route('/:id').delete(deleteMenu);

module.exports = router;  
