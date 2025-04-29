const express = require('express');
const router = express.Router();
const { toggleVisit, getVisitlist, removeVisit } = require('../controllers/visitController');

router.post('/', toggleVisit);
router.get('/:userId', getVisitlist);
router.delete('/:userId/:productId', removeVisit);

module.exports = router;