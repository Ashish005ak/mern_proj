const express = require('express');
const router = express.Router();
const { compileCode } = require('../controllers/compileController');

router.post('/compile', compileCode);

module.exports = router;
