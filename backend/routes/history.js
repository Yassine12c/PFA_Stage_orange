const router = require('express').Router();
const { getUserHistory, deleteSelectedHistory, deleteAllHistory } = require('../controllers/historyController');
const auth = require('../middleware/authMiddleware');

router.get('/history', auth, getUserHistory);
router.post('/delete', auth, deleteSelectedHistory);     // <-- juste /delete
router.post('/deleteAll', auth, deleteAllHistory);       // <-- juste /deleteAll

module.exports = router;
