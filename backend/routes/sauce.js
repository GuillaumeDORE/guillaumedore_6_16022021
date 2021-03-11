const express = require('express');
const router = express.Router();

const sauceCtrl = require ('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const {apiLimiter} = require('../middleware/rate-limiter');

router.post('/', auth, apiLimiter, multer, sauceCtrl.createSauce);
router.get('/', auth, apiLimiter, sauceCtrl.getAllSauces);
router.get('/:id', auth, apiLimiter, sauceCtrl.getOneSauce);
router.put('/:id', auth, apiLimiter, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, apiLimiter, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, apiLimiter, sauceCtrl.createLike);

module.exports = router;
