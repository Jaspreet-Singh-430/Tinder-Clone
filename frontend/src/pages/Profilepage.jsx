import React, { useState,useRef } from 'react'
import Header from '../components/Header'
import {useAuthStore} from "../store/useAuth.js"
import {useUserStore} from "../store/useUserStore.js"
const Profilepage = () => {
  const {authUser}=useAuthStore();
  const [name,setName]=useState(authUser.name || "");
  const [bio,setBio]=useState(authUser.bio || "");
  const [gender,setGender]=useState(authUser.gender || "");
  const [age,setAge]=useState(authUser.age || "");
  const [genderPreference,setGenderPreference]=useState(authUser.genderPreference || []);
  const [profilePicture,setProfilePicture]=useState(authUser.profilePicture || null);
  const fileInputRef=useRef(null);
  const {loading,updateProfile}=useUserStore();
  console.log("Auth user in profile page is "+authUser);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    // const profileData=new FormData();
    updateProfile({name,bio,age,gender,genderPreference,profilePicture})
    // profileData.append("name", name);
    // profileData.append("bio", bio);
    // profileData.append("gender", gender);
    // profileData.append("age", age);
    // profileData.append("genderPreference", JSON.stringify(genderPreference));
    // if (image) {
    //   profileData.append("image", image);
    // }
    // await updateProfile(profileData);
  }
  const handleImageChange=(e)=>{
    const file=e.target.files[0];
    if(file){
      const reader=new FileReader();
      reader.onloadend=()=>{
        setProfilePicture(reader.result);
      }
      reader.readAsDataURL(file);
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header/>
      <div className="flex flex-grow flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Your Profile</h2>    
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
        <form action="" onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <div className="mt-1">
            <input type="text"
             name="name" 
             id="name"
            value={name} 
            onChange={(e)=>setName(e.target.value)} 
            required 
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"/>
          </div>
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
          <div className="mt-1">
            <input type="number"
             name="age" 
             id="age"
            value={age} 
            onChange={(e)=>setAge(e.target.value)} 
            required 
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"/>
          </div>
        </div>
            <div>
          <span className="block text-sm font-medium text-gray-700">Gender</span>
          <div className="flex space-x-4">
            {["Male","Female"].map((Option)=>(
              <label key={Option} className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value={Option}
                  checked={gender === Option}
                  onChange={(e) => setGender(e.target.value)}
                  className="form-radio text-pink-600"
                />
                <span className="ml-2">{Option}</span>
              </label>
            ))}
          </div>
          {/* <input type="radio" name="gender"  
          className="form-radio text-pink-600"/> */}
        </div>

        <div>
          <span className="block text-sm font-medium text-gray-700">Gender Preference</span>
          <div className="flex space-x-4">
       {["Male","Female","Both"].map((Option)=>(
              <label key={Option} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="genderPreference"
                  value={Option}
                  checked={genderPreference === Option}
                  onChange={(e) => setGenderPreference(e.target.value)}
                  className="form-checkbox text-pink-600"
                />
                <span className="ml-2">{Option}</span>
              </label>
            ))}
          </div>
          {/* <input type="radio" name="gender"  
          className="form-radio text-pink-600"/> */}
        </div>


        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
          <div className="mt-1">
            <textarea 
            id="bio" 
            name="bio"
            value={bio}
            onChange={(e)=>setBio(e.target.value)}
            rows={3} 
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"/>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <div className='mt-1 flex items-center'>
            <button type="button" 
            onClick={()=>fileInputRef.current.click()}
            className="inline-flex py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
              Upload Image
            </button>
            <input ref={fileInputRef} type="file"
            accept="image/*"
            className='hidden'
            onChange={handleImageChange}
             />
          </div>
          </div>
          {profilePicture && (<div className='mt-4'>
            <img src={profilePicture} alt="Profile Preview" className='h-full w-48 object-cover rounded-md'/>
          </div>)}

              <button type="submit"
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm
         text-sm font-medium text-white ${
         loading ? "bg-pink-400 cursor-not-allowed"
         : "bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
         }`}
         disabled={loading}>
            {loading?"Saving...":"Save"}
         </button>

        </form>
        </div>    
        </div>
      </div>
    </div>
  )
}

export default Profilepage
