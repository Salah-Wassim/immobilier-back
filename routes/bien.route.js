const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const bien_controller = require('../controller/bien.controller');

router.get('/', bien_controller.list_bien);
router.get('/:id', bien_controller.find_one_biens);
router.post('/', auth(), bien_controller.create_bien);
router.put('/:id', auth(), bien_controller.edit_bien);
router.delete('/:id', auth(), bien_controller.delete_bien);

module.exports = router;