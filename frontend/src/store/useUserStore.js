import {create} from "zustand";
import {axiosInstance} from "../lib/axios";
import toast from "react-hot-toast";
export const useUserStore = create((set) => ({
    loading:false,
    updateProfile:async(profileData)=>{
        try {
            set({loading:true})
            await axiosInstance.put("/users/update",profileData)
            toast.success("Profile updated successfully")
        }
        catch(err){
            console.log(err)
            toast.error(err?.response?.data?.message || "Something went wrong")
        }
        finally{
            set({loading:false})
        }
}
})
);