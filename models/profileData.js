let db = require('../util/database');

function getProfile(profileID) {
    return db.execute("SELECT * FROM profile WHERE profileID = '" + profileID + "'");
}

module.exports = {
    getProfile : getProfile
}