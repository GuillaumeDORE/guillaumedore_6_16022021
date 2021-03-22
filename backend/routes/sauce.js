const express = require('express');
const router = express.Router();

const sauceCtrl = require ('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const {apiLimiter} = require('../middleware/rate-limiter');
const sanitizer = require('../middleware/sanitize');

router.post('/', auth, apiLimiter, sanitizer, multer, sauceCtrl.createSauce);
router.get('/', auth, apiLimiter, sauceCtrl.getAllSauces);
router.get('/:id', auth, apiLimiter, sauceCtrl.getOneSauce);
router.put('/:id', auth, apiLimiter, sanitizer,  multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, apiLimiter, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, apiLimiter, sauceCtrl.createLike);

module.exports = router;
