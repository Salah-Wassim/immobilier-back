const express = require('express');
const router = express.Router();
const authAdmin = require('../middleware/auth-admin')

const bien_controller = require('../controller/bien.controller');

router.get('/', bien_controller.list_bien);
router.get('/:id', bien_controller.find_one_biens);
router.post('/', bien_controller.create_bien);
router.put('/:id', authAdmin(), bien_controller.edit_bien);
router.delete('/:id', authAdmin(), bien_controller.delete_bien);

module.exports = router;