function toggleReplies() {  // function for post-partial.hbs: trying to unhide reply section 
    var replies = document.getElementById("show-replies");
    if (replies.style.display === "none") {
        replies.style.display = "block";
    } else {
        replies.style.display = "none";
    }
}

function checkEmpty() {  // function for all-messages-profile.hbs: trying to disable/grey out send button when the textarea is empty
    if(document.getElementById("message-area").value.length === 0) {
        document.getElementById("submit-btn").disabled = true;
        document.getElementById.style.background = "#b1b8bd";
    } else {
        document.getElementById("submit-btn").disabled = false;
    }
}