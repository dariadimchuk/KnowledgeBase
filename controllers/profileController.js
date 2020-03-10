let profileModel = require('../models/profileData');

exports.getProfile = (req,res,next) => {
    let id = req.params.profileID;
    let Profile = profileModel.getProfile(id);
    Profile.then( ([data, metadata]) => {
        res.render('profile', { profile: data[0], profileCSS: true });
   });
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