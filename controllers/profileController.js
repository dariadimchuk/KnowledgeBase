let profileModel = require('../models/profileData');

exports.getProfile = (req,res,next) => {
    let id = req.params.profileID;
    
    let discussion = profileModel.getLatestPosts(5); //grabs top 5
    
    discussion.then( ([latestPosts, metadata]) => {
        let Profile = profileModel.getProfile(id);
        Profile.then( ([data, metadata]) => {
            
            res.render('main-profile', 
                { 
                    profile: data[0],
                    post: latestPosts,
                    profileCSS: true 
                });
       });

    })
}