import Message from '../models/message.js';
export const sendMessage=async()=>{
try {
const { recipientId, content } = req.body;
const newMessage=await Message.create({
    sender: req.user._id,
    recipient: recipientId,
    content
});
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
export const getConversations=async()=>{
const { userId } = req.params;
    try {
const messages=await Message.find({
    $or: [
        { sender: req.user._id, recipient: userId },
        { sender: userId, recipient: req.user._id }
    ]
}).sort({ createdAt: 1 });
res.status(200).json({
    success: true,
    messages,
})
}
catch(error){
    res.status(500).json({
        success: false,
        message: "Error fetching conversations"
    })
}
}   