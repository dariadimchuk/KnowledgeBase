let profileModel = require('../models/profileData');


exports.getAllConversation = (req, res, next) => { //Shasha: Added to start on messages page (Slide 10)
    let conversations = profileModel.allConversations();
    conversations.then( ([data, metadata]) => {
        let messages = profileModel.allMessages(1); //Hardcode convoID=1 for now
        messages.then( ([messageData, metadata]) => {
            res.render('all-messages-profile', 
                {
                    conversation: data, 
                    message: messageData,
                    messageCSS: true
                });
        })
    })
}

//exports.getAllConversation = (req, res, next) => { //Shasha: Added to start on messages page (Slide 10)
//    let conversations = profileModel.allConversations();
//    conversations.then( ([data, metadata]) => {
//        res.render('all-messages-profile', {
//            conversation: data, 
//            messageCSS: true
//        });
//    })
//}