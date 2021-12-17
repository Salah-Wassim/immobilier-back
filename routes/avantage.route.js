const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const avantage_controller = require('../controller/avantage.controller');

router.get('/', avantage_controller.list_avantage);
router.post('/', auth(), avantage_controller.create_avantage);
router.put('/:id', auth(), avantage_controller.edit_avantage);
router.delete('/:id', auth(), avantage_controller.delete_avantage);

module.exports = router;