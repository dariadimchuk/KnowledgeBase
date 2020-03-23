let profileModel = require('../models/profileData');

var skip = 0;
var take = 5;

/**
 * Serves as both GET and POST method. 
 * If GET, skip and take are defaulted to 0 and 5. (first time loading the page)
 * If POST, the specific skip and take values will be sent to this method & used in place of defaults.
 * 
 * Big method does several things in one:
 * 
 * 1. Retrieves profile information
 * 2. Retrieves recent discussion posts
 * 3. Retrieves recent discussion posts replies
 * 
 */
exports.getProfile = async (req,res,next) => {
    let id = req.params.profileID;

    //if previous button was clicked, attempt to decrement skip value (never below 0 !)
    if(req.body.previous) {
        let val = skip - take;
        if(val >= 0){
            skip = val;
        }
    } else if(req.body.next) { //if next button was clicked, increment skip
        skip += take;
    }
    
    
    //get profile info
    let profile = await profileModel.getProfile(id);

    //get all recent posts on this page
    let discussion = await profileModel.getLatestPosts(skip, take);
    let discussionHasAny = discussion && discussion[0] && discussion[0].length > 0;


    let disablePrevBtn = skip == 0 ? true : false;
    let disableNextBtn = !discussionHasAny;

    //get all post ids
    let postIds = discussionHasAny ? discussion[0].map(function(v){ return v.postID; }) : [];

    //get all replies for the posts on this page
    let replies = postIds.length > 0 ? await profileModel.getManyPostReplies(postIds) : [];
    let repliesHasAny = replies && replies[0] && replies[0].length > 0;

    let repliesByPostIDs = [];
    
    if(repliesHasAny){
        //group replies based on post ID
        repliesByPostIDs = replies[0].reduce(function(map, obj) {
            let existingVal = map[obj.postID];
            
            let val = new Array();
            if(existingVal){
                val = existingVal;
            }
    
            val.push(obj);
    
            map[obj.postID] = val;
            return map;
        }, {});
    }
    
    //finally grab all that data & pass to front end
    res.render('main-profile', 
        { 
            profileId: id,
            profile: profile[0],
            post: discussion[0],
            replies: repliesByPostIDs,
            profileCSS: true ,
            disablePrev: disablePrevBtn,
            disableNext: disableNextBtn
        }
    );


}