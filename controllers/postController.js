let profileModel = require('../models/profileData');

exports.getAllPosts = (req, res, next) => {
    let posts = profileModel.allPosts()
    posts.then( ([data, metadata]) => {
        res.render('all-posts-profile', {
            post: data, 
            profileCSS: true
        }); // Shasha: changed from res.send(data) to this
    })
}


exports.getRepliesToPost = (req, res, next) => {
    let postid = req.params.postID
    let replies = profileModel.postReplies(postid)
    replies.then( ([data, metadata]) => {
        res.send(data)
    })
}


exports.addPost = (req, res, next) => {
    let id = req.params.profileID;
    let title = req.body.posttitle;
    let category = req.body.postcategory;
    let content = req.body.postbody;

    let posts = profileModel.addPost(id, title, category, content);

    posts.then( ([data, metadata]) => {
        res.send(data)
    });

}