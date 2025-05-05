const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const admin_controller = require('../controller/admin.controller');

router.get('/', admin_controller.find_all_admin);
router.get('/:id', admin_controller.find_one_admin);
router.post('/new-admin', admin_controller.create_admin);
router.post('/login', admin_controller.login_admin);
router.put('/edit-admin/:id', admin_controller.edit_admin);
router.delete('/delete-admin/:id', admin_controller.delete_admin);

module.exports = router;