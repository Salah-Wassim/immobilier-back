const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const avantage_controller = require('../controller/avantage.controller');

router.get('/', avantage_controller.list_avantage);
router.get('/:id', avantage_controller.find_one_avantage)
router.post('/', avantage_controller.create_avantage);
router.put('/:id', avantage_controller.edit_avantage);
router.delete('/:id', avantage_controller.delete_avantage);

module.exports = router;