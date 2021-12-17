const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const annonce_controller = require('../controller/annonce.controller');

router.get('/', annonce_controller.list_annonce);
router.post('/', auth(), annonce_controller.create_annonce);
router.put('/:id', auth(), annonce_controller.edit_annonce);
router.delete('/:id', auth(), annonce_controller.delete_annonce);
router.get('/:id', annonce_controller.detail_annonce);
router.get('/search/:search', annonce_controller.search_annonce)
router.get('/category/:id', annonce_controller.list_realtor_annonce)


module.exports = router;