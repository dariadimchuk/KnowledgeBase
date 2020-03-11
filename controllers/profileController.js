let profileModel = require('../models/profileData');

exports.getProfile = (req,res,next) => {
    let id = req.params.profileID;
    let Profile = profileModel.getProfile(id);
    Profile.then( ([data, metadata]) => {
        res.render('main-profile', { profile: data[0], profileCSS: true });
   });
}


/**
 * Edits an existing profile.
 *
 * Email and password should be done in loginController maybe??? They're security related
 * @param req
 * @param res
 * @param next
 */
exports.editProfile = (req, res, next) => {
    let id = req.params.profileID;
    let fname = req.body.profileFirstName;
    let lname = req.body.profileLastName;
    let avatar = req.body.profileImg;
    let about = req.body.profileAbout;
    let dob = req.body.profileDOB;
    let country = req.body.profileCountry;


    let profile = profileModel.editProfile(id, fname, lname, avatar, about, dob, country);

    profile.then( ([data, metadata]) => {
        res.render('profile', { profile: data[0], profileCSS: true });
    });

    // posts.then( ([data, metadata]) => {
    //     res.send(data)
    // });

}


/* getLikeCount() */


/* incrementLikeCount() */
