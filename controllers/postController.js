let profileModel = require('../models/profileData');

var skip = 0;
var take = 5;



exports.getAllPosts = (req, res, next) => {
    let posts = profileModel.allPosts()
    posts.then( ([data, metadata]) => {
        res.render('all-posts-profile', {
            post: data, 
            profileCSS: true
        }); // Shasha: changed from res.send(data) to this
    })
}


exports.latestPostsPagination = (req, res, next) => {    
    //if previous button was clicked, attempt to decrement skip value (never below 0 !)
    if(req.body.previous) {
        let val = skip - take;
        if(val >= 0){
            skip = val;
        }
    } else { //if next button was clicked, increment skip
        skip += take;
    }
    
    let id = req.body.profileId;
    let Profile = profileModel.getProfile(id);

    let discussion = profileModel.getLatestPosts(skip, take);

    discussion.then( ([latestPosts, metadata]) => {
        let disablePrevBtn = skip == 0 ? true : false;
        let disableNextBtn = latestPosts.length == 0 ? true : false;

        Profile.then( ([data, metadata]) => {
            
            res.render('main-profile', 
                { 
                    profile: data[0],
                    post: latestPosts,
                    profileCSS: true ,
                    disablePrev: disablePrevBtn,
                    disableNext: disableNextBtn
                }
            );
       });

        
    });
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