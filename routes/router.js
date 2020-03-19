const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const profileController = require('../controllers/profileController');
const postController = require('../controllers/postController')

// PROFILE
router.get('/profile/:profileID', profileController.getProfile);


// LOGIN
router.get('/login', loginController.verifyLogin) //will change to POST to match form action
router.get('/signup', loginController.createNewProfile) // will change to POST to match form action
router.get('/confirm-signup', loginController.confirmNewProfile) // will change to POST to match form action
router.get('/logout', loginController.logoutUser)

// POST
router.get('/post', postController.getAllPosts)
router.get('/post/:postID', postController.getRepliesToPost)
router.post('/post/:profileID', postController.addPost);


module.exports = router;