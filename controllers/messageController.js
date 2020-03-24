let profileModel = require('../models/profileData')

exports.addConversation = (req,res) => {
    // let senderID = req.body.senderId
    // let receiverID = req.body.receiverId
    // let subject = req.body.subject
    // let content = req.body.message

    let senderID = 1
    let receiverID = 2
    let subject = 'Conversation 2'
    let content = 'First message of convo 2'

    let convo = profileModel.addConvo(senderID, receiverID, subject)
    convo.then( ([data, metadata]) => {
        let convoID = data.insertId
        let message = profileModel.addMessage(convoID, senderID, content)
        message.then( ([data, metadata]) => {
            res.send(data)
        })
    })
}

exports.getAllConversations = (req,res) => {
    let userID = req.params.profileID   // ID of current user

    let convos = profileModel.allConvos(userID)
    convos.then( ([data, metadata]) => {
        res.send(data)
    })
}

exports.addMessage = (req,res) => {
    // let convoID = req.body.convoId
    // let senderID = req.body.senderId
    // let content = req.body.content

    let convoID = 2
    let senderID = 2
    let content = 'following reply!'

    let message = profileModel.addMessage(convoID, senderID, content)
    message.then( ([data, metadata]) => {
        res.send(data)
    })
}

exports.getAllMessagesInConvo = (req,res) => {
    // let convoId = req.body.convoId
    let convoId = req.params.convoID

    let messages = profileModel.allConvoMessages(convoId)
    messages.then( ([data, metadata]) => {
        res.send(data)
    })
}
