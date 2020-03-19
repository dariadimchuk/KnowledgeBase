let profileModel = require('../models/profileData');

exports.getProfile = (req,res,next) => {
    let id = req.params.profileID;
    
    //first time we load profile page, so grab initial latest posts
    let discussion = profileModel.getLatestPosts(0, 5); //skip 0, take 5
    
    discussion.then( ([latestPosts, metadata]) => {
        let Profile = profileModel.getProfile(id);
        Profile.then( ([data, metadata]) => {
            
            res.render('main-profile', 
                { 
                    profile: data[0],
                    post: latestPosts,
                    profileCSS: true ,
                    disablePrev: true
                });
       });

    })
}