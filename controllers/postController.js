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


/**
 * Big method does several things in one:
 * 
 * 1. Retrieves profile information
 * 2. Retrieves recent discussion posts
 * 3. Retrieves recent discussion posts replies
 * 
 */
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
    
    //get profile info
    let Profile = profileModel.getProfile(id);

    //get all recent posts on this page
    let discussion = profileModel.getLatestPosts(skip, take);

    discussion.then( ([latestPosts, metadata]) => {
        let disablePrevBtn = skip == 0 ? true : false;
        let disableNextBtn = latestPosts.length == 0 ? true : false;
        
        //get all post ids
        let postIds = latestPosts.map(function(v){ return v.postID; });

        //get all replies for the posts on this page
        let replies = profileModel.getManyPostReplies(postIds);
        
        replies.then(([reps, metadata]) => {

            //group replies based on post ID
            let repliesByPostIDs = reps.reduce(function(map, obj) {
                let existingVal = map[obj.postID];
                
                let val = new Array();
                if(existingVal){
                    val = existingVal;
                }

                val.push(obj);

                map[obj.postID] = val;
                return map;
            }, {});


            console.log(repliesByPostIDs);


            //finally grab all that data & pass to front end
            Profile.then( ([data, metadata]) => {
            
                res.render('main-profile', 
                    { 
                        profile: data[0],
                        post: latestPosts,
                        replies: repliesByPostIDs,
                        profileCSS: true ,
                        disablePrev: disablePrevBtn,
                        disableNext: disableNextBtn
                    }
                );
           });
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