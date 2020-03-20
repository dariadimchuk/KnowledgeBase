let profileModel = require('../models/profileData');

var skip = 0;
var take = 5;


exports.getProfile = (req,res,next) => {
    let id = req.params.profileID;

    if(req.body.previous) {
        let val = skip - take;
        if(val >= 0){
            skip = val;
        }
    } else if(req.body.next) { //if next button was clicked, increment skip
        skip += take;
    }
    
    let Profile = profileModel.getProfile(id);
    let discussion = profileModel.getLatestPosts(skip, take);

    discussion.then( ([latestPosts, metadata]) => {
        let disablePrevBtn = skip == 0 ? true : false;
        let disableNextBtn = latestPosts.length == 0 ? true : false;

        console.log(latestPosts);
        console.log(data[0]);


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