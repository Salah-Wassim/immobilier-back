const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const admin_controller = require('../controller/admin.controller');

router.post('/', admin_controller.create_admin);
router.post('/login', admin_controller.login_admin);

module.exports = router;