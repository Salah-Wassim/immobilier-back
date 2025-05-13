const express = require('express');
const router = express.Router();
const authAdmin = require('../middleware/auth-admin')

const keyword_controller = require('../controller/keyword.controller');

router.get('/', keyword_controller.list_keyword);
router.get('/:id', keyword_controller.find_one_keyword);
router.post('/', keyword_controller.create_keyword);
router.put('/:id', authAdmin(), keyword_controller.edit_keyword);
router.delete('/:id', authAdmin(), keyword_controller.delete_keyword);

module.exports = router;