let profileModel = require('../models/profileData')

exports.verifyLogin = (req,res) => {
    // let email = req.body.email;
    // let password = req.body.password;
    let email = "sw123@gmail.com"
    let password = "password"

    let profileId = profileModel.login(email, password)
    profileId.then( ([data, metadata]) => {
        if (data.length == 0) {
            res.send("Invalid email and/or password.")
        } else {
            res.redirect(`/profile/${data[0].profileID}`)
        }
    })
}

exports.createNewProfile = (req,res) => {
    // let fname = req.body.firstname
    // let lname = req.body.lastname
    // let email = req.body.email
    // let pw = req.body.password

    let fname = "toby"
    let lname = "flenderson"
    let email = "tf@gmail.com"
    let pw = "password"

    let profile = profileModel.newProfile(fname, lname, email, pw)
    profile.then( ([data, metadata]) => {
        res.send(`${data.insertId}`)  // returns profileId of new user entry
    })
}

exports.confirmNewProfile = (req,res) => {
    // let url = req.body.imgurl
    // let about = req.body.about
    // let dob = req.body.dob
    // let country = req.body.country
    // let profileId = req.body.profileId

    let url = "https://randomuser.me/api/portraits/med/men/31.jpg"
    let about = "HR REP"
    let dob = "1955-10-10"
    let country = "Brazil"
    let profileId = 18  // need to provide profileId of new user

    let profile = profileModel.confirmProfile(url, about, dob, country, profileId)
    profile.then( ([data, metadata]) => {
        res.redirect(`/profile/${profileId}`) // uses profileID of new user to update row and renders
    })
}

exports.logoutUser = (req,res) => {
    res.redirect('/')
}