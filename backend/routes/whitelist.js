const router = require('express').Router();
const { getWhitelist, addWhitelist, removeWhitelist } = require('../controllers/whitelistController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, getWhitelist);
router.post('/add', auth, addWhitelist);
router.post('/remove', auth, removeWhitelist);

module.exports = router;
