const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const profileController = require('../controllers/profileController');
const postController = require('../controllers/postController')

// PROFILE
router.get('/profile/:profileID', profileController.getProfile);


// POST
router.get('/posts', postController.getAllPosts)
router.get('/post/:postID', postController.getRepliesToPost)

//router.get('/', loginController.logout);
//router.post('/login', loginController.login);

module.exports = router;