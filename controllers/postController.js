let profileModel = require('../models/profileData');


exports.getAllPosts = async (req, res, next) => {
    let posts = await profileModel.allPosts()
    
    //get all post ids
    let postIds = posts ? posts[0].map(function(v){ return v.postID; }) : [];

    //get all replies
    let replies = await profileModel.getRepliesToPostsByIds(postIds);
    
    //attach replies to each post
    posts[0].forEach(element => {
        element.replies = replies[element.postID];
        element.numReplies = replies[element.postID] ? replies[element.postID].length : 0;
    });
    

    let id = req.params.profileID;
    let profile = await profileModel.getProfile(id);

    res.render('all-posts-profile', {
        profile: JSON.parse(JSON.stringify(profile[0][0])),
        post: posts[0], 
        profileCSS: true
    }); // Shasha: changed from res.send(data) to this
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