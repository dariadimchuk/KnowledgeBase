const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const profileController = require('../controllers/profileController');
const postController = require('../controllers/postController')

// PROFILE
router.get('/profile/:profileID', profileController.getProfile);


// LOGIN
router.get('/login', loginController.verifyLogin)


// POST
router.get('/post', postController.getAllPosts)
router.get('/post/:postID', postController.getRepliesToPost)
router.post('/post/:profileID', postController.addPost);


//router.get('/', loginController.logout);
//router.post('/login', loginController.login);

module.exports = router;