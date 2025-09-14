const router = require('express').Router();
const { checkLink } = require('../controllers/linkController');
const auth = require('../middleware/authMiddleware');

router.post('/check', auth, checkLink);

module.exports = router;
