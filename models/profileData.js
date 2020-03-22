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
    return db.execute(`SELECT * FROM profile WHERE email='${email}' AND password='${password}'`)
}

const getAllPosts = () => {
    return db.execute("SELECT * FROM post ORDER BY postDate DESC")
}


const getLatestPosts = (skip, take) => {
    return db.execute("SELECT * FROM post ORDER BY postDate DESC LIMIT " + take + " OFFSET " + skip)
}

const getPostReplies = (postID) => {
    return db.execute(`SELECT * from reply WHERE postID=${postID} ORDER BY replyDate ASC`)
}

const getManyPostReplies = (postIDsArray) => {
    return db.execute(`SELECT * from reply WHERE postID IN (${postIDsArray}) ORDER BY replyDate ASC`);
}



const addNewProfile = (first, last, email, pw) => {
    let sql = `INSERT INTO profile (firstName, lastName, email, password, numLikes, numPosts, numMessages, 
        numAnswers) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

    return db.query(sql,[
        first,
        last,
        email,
        pw,
        0,
        0,
        0,
        0
    ],function(error, results){});
}

const confirmNewProfile = (imgurl, about, dob, country, profileId) => {
    let sql = `UPDATE profile SET profileImage=?, about=?, DOB=?, country=? WHERE profileID=?`

    return db.query(sql,[
        imgurl,
        about,
        dob,
        country,
        profileId
    ],function(error, results){});
}

const getNumPosts = (profileId) => {
    return db.execute(`SELECT COUNT(*) FROM post WHERE profileID=${profileId}`)
}

const getSearchResults= (keywords) => {
    return db.execute("Select * from post WHERE title LIKE " + "'%" + keywords + "%'")
}

const getAllConversations = () => { //Shasha: Added to start on messages page (Slide 10)
    return db.execute("SELECT * FROM conversation ORDER BY convoDate DESC")
}

const getAllMessages = (convoID) => { //Shasha: Added to start on messages page (Slide 10)
    return db.execute(`SELECT * FROM message WHERE convoID=${convoID} ORDER BY messageDate DESC`)
}

module.exports = {
    getProfile : getProfile,
    allPosts : getAllPosts,
    getLatestPosts: getLatestPosts,
    addPost: addPost,
    postReplies : getPostReplies,
    getManyPostReplies: getManyPostReplies,
    login : verifyLogin,
    newProfile : addNewProfile,
    confirmProfile : confirmNewProfile,
    numPosts : getNumPosts,
    search : getSearchResults,
    allConversations : getAllConversations,
    allMessages : getAllMessages
}
