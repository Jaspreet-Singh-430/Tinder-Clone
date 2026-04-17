import cloudinary from "../config/cloudinary.js";
import User from "../models/user.js";
export const updateProfile=async(req,res)=>{
try {
    const {profilePicture,...otherData}=req.body;
    let updatedData=otherData;
    if(profilePicture) {
        if(profilePicture.startsWith("data:image")) {
        try{
            const uploadResponse=await cloudinary.uploader.upload(profilePicture);
            updatedData.profilePicture=uploadResponse.secure_url;
    }
        catch(error) {
            console.error("Cloudinary upload error:", error);
            return res.status(500).json({
                success: false,
                message: "Error uploading profile picture"
            })
        }
    }
}
    const updatedUser=await User.findByIdAndUpdate(req.user._id,updatedData,{new: true});
    res.status(200).json({
        success: true,
        user: updatedUser,
        message: "Profile updated successfully"
    })
}
catch(error){
    console.error(error);
    res.status(500).json({
        success: false,
        message: "Server error"
    })
}
}