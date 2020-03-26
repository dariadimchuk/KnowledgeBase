function toggle(){
    var post = event.target.parentNode; //discussion-content div
    var postRepliesSection = post.getElementsByClassName("all-replies")[0];
    
    let hidden = postRepliesSection.classList.contains("hidden");

    if(hidden){
        postRepliesSection.classList.remove("hidden");
    } else postRepliesSection.classList.add("hidden");
}


function checkEmpty() {  // function for all-messages-profile.hbs: trying to disable/grey out send button when the textarea is empty
    if(document.getElementById("message-area").value.length === 0) {
        document.getElementById("submit-btn").disabled = true;
        document.getElementById.style.background = "#b1b8bd";
    } else {
        document.getElementById("submit-btn").disabled = false;
    }
}