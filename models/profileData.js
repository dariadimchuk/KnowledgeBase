let db = require('../util/database');

function addPost(profileID, title, category, content) {
    let date = new Date().toUTCString();

    let sql = "INSERT into post (profileID, postDate, title, category, content, numReplies) "
        + "values (?, ?, ?, ?, ?, ?)";

    return db.query(sql,[
        profileID,
        date,
        title,
        category,
        content,
        0
    ],function(error, results){});
}

function getProfile(profileID) {
    return db.execute("SELECT * FROM profile WHERE profileID = '" + profileID + "'");
}

const verifyLogin = (email, password) => {
    return db.execute(`SELECT profileID FROM profile WHERE email='${email}' AND password='${password}'`)
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
    addPost: addPost,
    postReplies : getPostReplies,
    login : verifyLogin
}
