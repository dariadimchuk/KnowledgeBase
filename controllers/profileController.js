let profileModel = require('../models/profileData');

exports.getProfile = (req,res,next) => {
    let id = req.params.profileID;
    let Profile = profileModel.getProfile(id);
    Profile.then( ([data, metadata]) => {
        res.render('main-profile', { profile: data[0], profileCSS: true });
   });
}