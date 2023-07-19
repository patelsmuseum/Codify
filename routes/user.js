const express = require('express');

const router = express.Router();

const userController = require('../controllers/users_controller');

router.get('/profile' , userController.profile);

// ading router for sign in and signup page
router.get('/sign-up' , userController.signUp);
router.get('/sign-in' , userController.signin);

router.post('/create', userController.create);

module.exports = router;