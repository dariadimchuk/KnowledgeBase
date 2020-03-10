let db = require('../util/database');

function getProfile(profileID) {
    return db.execute("SELECT * FROM profile WHERE profileID = '" + profileID + "'");
}

const getAllPosts = () => {
    return db.execute("SELECT * FROM post ORDER BY postDate DESC")
}

const getPostReplies = (postID) => {
    return db.execute(`SELECT * from reply WHERE postID=${postID} ORDER BY replyDate ASC`)
}

module.exports = {
    getProfile : getProfile,
    allPosts : getAllPosts,
    postReplies : getPostReplies
}