let db = require('../util/database');

function addPost(profileID, title, category, content) {

    let date = new Date();
    let replies = 0;

    let sql = "INSERT into post (profileID, postDate, title, category, content, numReplies) values ('"
        + profileID + "','"
        +  date.toUTCString() + "','"
        +  title + "','"
        +  category + "','"
        +  content + "','"
        + replies + "')";


    console.log(sql);

    return db.execute(sql);
}

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
    addPost: addPost,
    postReplies : getPostReplies
}



