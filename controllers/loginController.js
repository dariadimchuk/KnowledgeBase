let profileModel = require('../models/profileData')

exports.verifyLogin = (req,res) => {
    // let email = req.body.email;
    // let password = req.body.password;
    let email = "sw123@gmail.com";
    let password = "password"

    let profileId = profileModel.login(email, password)
    profileId.then( ([data, metadata]) => {
        if (data.length == 0) {
            res.send("Login Failed.")
        } else {
            res.send(data)
        }
    })
}