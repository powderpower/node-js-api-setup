const express       = require('express');
const asyncHandler  = require('express-async-handler')

const authController = require('../controllers/auth');

const validationManager = require('../utils/validationManager');

const router = express.Router();

router.put(
    '/signup',
    [
        validationManager.validateEmail(),
        validationManager.validateName(),
        validationManager.validatePassword(),
        validationManager.validatePasswordConfirmation(),
    ],
    asyncHandler(authController.signup)
);

router.post(
    '/login',
    [
        validationManager.validateEmail(false),
        validationManager.validatePassword(),
    ],
    asyncHandler(authController.login)
);

module.exports = router;