const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const profileController = require('../controllers/profileController');

router.get('/profile/:profileID', profileController.getProfile);

//router.get('/', loginController.logout);
//router.post('/login', loginController.login);

module.exports = router;