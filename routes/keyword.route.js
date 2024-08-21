const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const keyword_controller = require('../controller/keyword.controller');

router.get('/', keyword_controller.list_keyword);
router.get('/:id', keyword_controller.find_one_keyword);
router.post('/', keyword_controller.create_keyword);
router.put('/:id', keyword_controller.edit_keyword);
router.delete('/:id', keyword_controller.delete_keyword);

module.exports = router;