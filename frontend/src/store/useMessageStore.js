import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import {getSocket} from '../socket/socket.client.js'
import {useAuthStore} from "./useAuth.js"
import toast from "react-hot-toast"
export const useMessageStore=create((set)=>({
messages:[],
loading:false,
sendMessage:async (recipientId,content)=>{
try {
set(state=>({messages:[...state.messages,{_id:Date.now(),sender:useAuthStore.getState().authUser._id,recipient:recipientId,content}]}))
// set({loading:true})
const res=await axiosInstance.post('/messages/send',{recipientId,content})
console.log("message sent")

}
catch(err){
toast.error(err.message || "Something went wrong");

}
},
getMessages:async (userId)=>{
try {
set({loading:true})
const res=await axiosInstance.get(`messages/conversation/${userId}`)
console.log(res.data)
set({messages:res.data.messages})
}
catch(err){
    console.log(err)
    set({messages:[]})
}
finally{
    set({loading:false})
}
},
subscribeToMessages:()=>{
    const socket=getSocket();
    socket.on("new-message",({message})=>{
        set(state=>({messages:[...state.messages,message]}))
    })
},

unsubscribeFromMessages:()=>{
    const socket=getSocket()
    socket.off("new-message")
}
}))