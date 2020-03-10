let profileModel = require('../models/profileData');

exports.getAllPosts = (req,res) => {
    let posts = profileModel.allPosts()
    posts.then( ([data, metadata]) => {
        res.send(data)
    })
}

exports.getRepliesToPost = (req,res) => {
    let postid = req.params.postID
    let replies = profileModel.postReplies(postid)
    replies.then( ([data, metadata]) => {
        res.send(data)
    })
}