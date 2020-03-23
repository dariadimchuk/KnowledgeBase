const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const profileController = require('../controllers/profileController');
const postController = require('../controllers/postController')
const searchController = require('../controllers/searchController')
const messageController = require('../controllers/messageController');

// PROFILE
router.route('/profile/:profileID')
  .get(profileController.getProfile)
  .post(profileController.getProfile);


// LOGIN
router.post('/login', loginController.verifyLogin)
router.post('/signup', loginController.createNewProfile)
router.post('/confirm-signup', loginController.confirmNewProfile)
router.get('/logout', loginController.logoutUser)

// POST
router.get('/post', postController.getAllPosts)
router.get('/post/:postID', postController.getRepliesToPost)
router.post('/post/:profileID', postController.addPost);

//SEARCH
router.post('/search', searchController.searchPosts)

// MESSAGE (added by Shasha - currently working on message page (Slide 10))
router.get('/message', messageController.getAllConversation)

module.exports = router;