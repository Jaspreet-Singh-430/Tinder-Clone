import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import User from "../models/user.js"
import dotenv from "dotenv"
dotenv.config();
const maleNames=["James","Robert","Michael","William","John","Richard","David"]
const femaleNames=["Mary","Patricia","Jennifer","Linda","Elizabeth",
    "Susan","Barbara","Sarah","Jessica"
]
const genderPreferences=["Male","Female","Both"]
const bioDescriptors=["Gym Rat","Coffee Addict","Bookworm","Sushi fanatic","Adventure Seeker",
    "Music Lover","Movie Buff","Night Owl","Early bird","Aspiring Chef"
]
const generateBio=()=>{
    const descriptors=bioDescriptors.sort(()=>0.5-Math.random()).slice(0,3)
    return descriptors.join(" | ")
}
const generateRandomUser=(gender,index)=>{
    const names=gender==="Male"?maleNames:femaleNames
    const name=names[index]
    const age=Math.floor(Math.random()*(45-21+1)+21)
    return({
        name,
        email:`${name.toLowerCase()}${age}@example.com`,
        password:bcrypt.hashSync("password@123",10),
        age,
        gender,
        genderPreference:genderPreferences[Math.floor(Math.random()*genderPreferences.length)],
        bio:generateBio(),
        profilePicture:`${gender}/${index+1}.jpg`
    })
}
const seedUsers=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        await User.deleteMany({})
        const maleUsers=maleNames.map((_,i)=>generateRandomUser("Male",i))
        const femaleUsers=femaleNames.map((_,i)=>generateRandomUser("Female",i))
        const allUsers=[...maleUsers,...femaleUsers]
        await User.insertMany(allUsers)
        console.log("Database seeded successfully");
    }
    catch(err){
    console.log(err.message)
    }
    finally{
        mongoose.disconnect()
    }
}
console.log(process.env.MONGO_URI)
seedUsers();