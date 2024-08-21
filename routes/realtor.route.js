const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

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

router.get('/list-realtors', realtor_controller.list_realtor)
router.post('/add-realtors',upload.single('picture'), realtor_controller.create_realtor);
router.post('/login', realtor_controller.login_realtor);
router.delete('/:id', realtor_controller.delete_realtor);

module.exports = router;