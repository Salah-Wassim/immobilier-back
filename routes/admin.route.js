const express = require('express');
const router = express.Router();
const authAdmin = require('../middleware/auth-admin')

const admin_controller = require('../controller/admin.controller');

router.get('/', authAdmin(), admin_controller.find_all_admin);
router.get('/:id', authAdmin(), admin_controller.find_one_admin);
router.post('/new-admin', authAdmin(), admin_controller.create_admin);
router.post('/login-admin', authAdmin(), admin_controller.login_admin);
router.put('/edit-admin/:id', authAdmin(), admin_controller.edit_admin);
router.delete('/delete-admin/:id', authAdmin(), admin_controller.delete_admin);

module.exports = router;