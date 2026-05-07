import {create} from "zustand";
import {axiosInstance} from "../lib/axios"
import toast from "react-hot-toast"
import { getSocket } from "../socket/socket.client";
export const useMatchStore=create((set)=>({
matches:[],
userProfiles:[],
isLoadingMyMatches:false,
isLoadingUserProfiles:false,
swipeFeedback:null,
getMyMatches:async()=>{
    try{
        set({isLoadingMyMatches:true})
        const res=await axiosInstance.get("/matches")
        set({matches:res.data.matches})
    }
    catch(err){
        set({matches:[]})
        toast.error(err.response.data.message || "Something went wrong")
    }
    finally {
        set({isLoadingMyMatches:false})
    }
},

getUserProfiles:async(a=1)=>{
    try{
        if(a==1)
        set({isLoadingUserProfiles:true})
        const res=await axiosInstance.get("/matches/user-profiles")
        console.log(res.data.users)
        set({userProfiles:res.data.users})
    }
    catch(err){
        set({userProfiles:[]})
        toast.error(error.response.data.message || "Something went wrong")
    }
    finally {
        set({isLoadingUserProfiles:false})
    }
},

swipeRight:async(user)=>{
try {
const res=await axiosInstance.post("/matches/swipe-right/"+user._id)
console.log(res.data.message)
if(res.data.message=="You have already disliked this user"){
    set({swipeFeedback:''})
}
else if(res.data.message=="You have already liked this user"){
    set({swipeFeedback:""});
}
else
set({swipeFeedback:"Liked"})

}
catch(err){
toast.error("Failed to swipe right")
    set({swipeFeedback:"Failed to swipe right"})
}
finally{
    setTimeout(()=>set({swipeFeedback:null}),2000)
}
},

swipeLeft:async(user)=>{
try {
const res=await axiosInstance.post("/matches/swipe-left/"+user._id)
console.log(res.data.message)
if(res.data.message=="You have already liked this user"){
    set({swipeFeedback:''})
}
else if(res.data.message=="You have already disliked this user"){
    set({swipeFeedback:""});
}
else
set({swipeFeedback:"Passed"})

}
catch(err){
    toast.error("Failed to swipe left")
    set({swipeFeedback:"Failed to swipe left"})
}
finally{
    setTimeout(()=>set({swipeFeedback:null}),2000)
}
},

subscribeToNewMatches:()=>{
    try {
    const socket=getSocket();
    socket.on("newMatch",(data)=>{
        set((state)=>({
            matches:[...state.matches,data]
        }))
        toast.success("You got a new match!")
    })
    }
    catch(err){
        console.log(err.message)
    }
},
unsubscribeFromMatches:()=>{
    try {
    const socket=getSocket();
    socket.off("newMatch");
    }
    catch(err){
        console.log(err.message)
    }
}

}))