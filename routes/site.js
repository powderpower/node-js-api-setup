const express = require('express');

const router = express.Router();

const siteController = require('../controllers/site');

router.get('/', siteController.getIndex);

module.exports = router;