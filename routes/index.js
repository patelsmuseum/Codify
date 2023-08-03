const express = require('express');

const router = express.Router();

console.log('router loaded ');

const homeController = require('../controllers/home_controller');

router.get('/' , homeController.home);
router.use('/users' , require('./user'));

router.use('/posts' , require('./posts'));
router.use('/comments' , require('./comments'));

//routes for postman apis
router.use('/api' , require('./api'))
module.exports = router;