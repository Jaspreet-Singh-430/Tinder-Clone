import Message from '../models/message.js';
import {getIO,getConnectedUsers} from '../socket/socket.js'
export const sendMessage=async(req,res)=>{
try {
const { recipientId, content } = req.body;
const newMessage=await Message.create({
    sender: req.user._id,
    recipient: recipientId,
    content
});
const io=getIO()
const connectedUsers=getConnectedUsers()
const receiverSocketId=connectedUsers.get(recipientId)
if(receiverSocketId){
    io.to(receiverSocketId).emit("new-message",{
        message:newMessage
    })
}
res.status(200).json({
    success: true,
    message: newMessage,
    
})
}
catch(error){
res.status(500).json({
    success: false,
    message: "Error sending message"
})
}
}
export const getConversations=async(req,res)=>{
const { userId } = req.params;
    try {
        // console.log(userId)
        // console.log(req.user._id)
const messages=await Message.find({
    $or: [
        { sender: req.user._id, recipient: userId },
        { sender: userId, recipient: req.user._id }
    ]
}).sort({ createdAt: 1 });
// console.log(messages)
res.status(200).json({
    success: true,
    messages:messages
})
}
catch(error){
    res.status(500).json({
        success: false,
        message: "Error fetching conversations"
    })
}
}   