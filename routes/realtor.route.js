const express = require('express');
const router = express.Router();
const authAdmin = require('../middleware/auth-admin')
const authRealtor = require ('../middleware/auth-realtor')

const realtor_controller = require('../controller/agentimmobilier.controller');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/picture');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({storage});

router.get('/me', authRealtor(), realtor_controller.me)
router.get('/list-realtors', realtor_controller.list_realtor)
router.get('/realtor/:id', realtor_controller.list_one_realtor)
router.post('/add-realtors', upload.single('picture'), realtor_controller.create_realtor);
router.put('/edit-realtor/:id', authRealtor(), realtor_controller.edit_realtor)
router.post('/login-realtor', realtor_controller.login_realtor);
router.delete('/:id', authAdmin(), realtor_controller.delete_realtor);

module.exports = router;