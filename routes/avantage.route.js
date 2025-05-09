const express = require('express');
const router = express.Router();
const authAdmin = require('../middleware/auth-admin')

const avantage_controller = require('../controller/avantage.controller');

router.get('/', avantage_controller.list_avantage);
router.get('/:id', avantage_controller.find_one_avantage)
router.post('/', avantage_controller.create_avantage);
router.put('/:id', authAdmin(), avantage_controller.edit_avantage);
router.delete('/:id', authAdmin(), avantage_controller.delete_avantage);

module.exports = router;