const express = require('express');
const { getPaginatedUsers, getUsersSummary } = require('../controllers/userController.js');

const router = express.Router();

router.get('/paginated', getPaginatedUsers);
router.get('/summary', getUsersSummary);

module.exports = router;
