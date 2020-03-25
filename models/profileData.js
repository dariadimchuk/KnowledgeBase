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
    return db.execute(`SELECT * FROM profile WHERE profileID=${profileID}`)
}

const verifyLogin = (email, password) => {
    return db.execute(`SELECT * FROM profile WHERE email='${email}' AND password='${password}'`)
}

const getAllPosts = () => {
    return db.execute("SELECT * FROM post ORDER BY postDate DESC")
}

const getUserPosts = (profileID) => {
    return db.execute(`SELECT * FROM post WHERE profileID='${profileID}'`)
}

const getLatestPosts = (skip, take) => {
    return db.execute("SELECT * FROM post ORDER BY postDate DESC LIMIT " + take + " OFFSET " + skip)
}

const getPostReplies = (postID) => {
    return db.execute(`SELECT * from reply WHERE postID=${postID} ORDER BY replyDate ASC`)
}

const getManyPostReplies = (postIDsArray) => {
    let sql = `SELECT * from reply WHERE postID IN (${postIDsArray}) ORDER BY replyDate ASC`;
    return db.execute(sql);
}



const addNewProfile = (first, last, email, pw) => {
    let sql = `INSERT INTO profile (firstName, lastName, email, password, numLikes, numPosts, numMessages) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`

    return db.query(sql,[
        first,
        last,
        email,
        pw,
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

const getSearchResults = (keywords) => {
    return db.execute("Select * from post WHERE title LIKE " + "'%" + keywords + "%'")
}

const addConversation = (senderID, receiverID, subject) => {
    let sql = `INSERT INTO conversation (senderID, receiverID, subject, convoDate) 
    VALUES (?, ?, ?, CURRENT_DATE())`

    return db.query(sql,[
        senderID, 
        receiverID, 
        subject
    ],function(error, results){})
}

const getAllConvos = (userID) => {
    // If user = sender, return receiver info, else return sender info
    return db.execute(`
    SELECT c.convoID, c.subject, c.convoDate, 
        IF(c.senderID = ${userID}, r.profileID, s.profileID) as profileID,
        IF(c.senderID = ${userID}, r.firstName, s.firstName) as firstName,
        IF(c.senderID = ${userID}, r.lastName, s.lastName) as lastName,
        IF(c.senderID = ${userID}, r.profileImage, s.profileImage) as profileImage
    FROM conversation c
    JOIN profile s ON s.profileID=c.senderID
    JOIN profile r ON r.profileID=c.receiverID
    WHERE s.profileID = ${userID} OR r.profileID = ${userID}
    ORDER BY convoDate ASC
    `)
}

const addMessage = (convoID, senderID, content) => {
    let sql = `INSERT INTO message (convoID, senderID, content, messageDate) 
    VALUES (?, ?, ?, CURRENT_TIMESTAMP())`

    return db.query(sql,[
        convoID, 
        senderID, 
        content
    ],function(error, results){})
}

const getAllMessagesInConversation = (convoId) => {
    return db.execute(`
    SELECT m.messageID, m.convoID, p.profileID, p.firstName, p.lastName, p.profileImage, 
        m.content, m.messageDate
    FROM message m
    JOIN profile p ON m.senderID=p.profileID
    WHERE convoID = ${convoId}
    ORDER BY messageDate ASC
    `)
}

const addLike = (profileID) => {
    return db.execute(`UPDATE profile SET numLikes = numLikes + 1 WHERE profileID='${profileID}'`)
}



//helper function

async function getRepliesToPosts(postIds){

    //get all replies for the posts on this page
    let replies = postIds.length > 0 ? await getManyPostReplies(postIds) : [];
    let repliesHasAny = replies && replies[0] && replies[0].length > 0;

    let repliesByPostIDs = [];

    if(repliesHasAny){
        //group replies based on post ID
        repliesByPostIDs = replies[0].reduce(function(map, obj) {
            let existingVal = map[obj.postID];
            
            let val = new Array();
            if(existingVal){
                val = existingVal;
            }
    
            val.push(obj);
    
            map[obj.postID] = val;
            return map;
        }, {});
    }

    return repliesByPostIDs;
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
    addConvo : addConversation,
    allConvos : getAllConvos,
    addMessage : addMessage,
    allConvoMessages : getAllMessagesInConversation,
    addLike: addLike,
    userPosts: getUserPosts,

    getRepliesToPostsByIds: getRepliesToPosts
}
