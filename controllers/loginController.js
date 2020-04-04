let profileModel = require('../models/profileData')

exports.verifyLogin = (req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    let profileId = profileModel.login(email, password)
    profileId.then( ([data, metadata]) => {
        if (data.length == 0) {
            res.send("Invalid email and/or password.")
        } else {
            req.session.profileID = data[0].profileID;
            res.redirect(`/profile/${data[0].profileID}`)
        }
    })
}

var newUser = []
exports.createNewProfile = (req,res) => {
    let fname = req.body.firstname
    let lname = req.body.lastname
    let email = req.body.email
    let pw = req.body.password

    let profile = profileModel.newProfile(fname, lname, email, pw)
    profile.then( ([data, metadata]) => {
        newUser[0] = data.insertId
        res.render('signup', {
            signupCSS: true,
            layout: 'login-layout.hbs'
        })
    })
}

exports.confirmNewProfile = (req,res) => {
    let url = req.body.imageurl
    let about = req.body.about
    let dob = req.body.dob
    let country = req.body.country
    let profileId = newUser[0]

    let profile = profileModel.confirmProfile(url, about, dob, country, profileId)
    profile.then( ([data, metadata]) => {
        res.redirect(`/profile/${profileId}`)
    })
}

exports.logoutUser = (req,res) => {
    req.session.destroy((err) => res.redirect('/'))
}