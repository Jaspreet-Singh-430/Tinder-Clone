import React from 'react'
import Sidebar from '../components/sidebar'
import {useAuthStore} from "../store/useAuth.js"
const HomePage = () => {
  // const {logout}=useAuthStore()
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-pink-100 to-purple-100
    overflow-hidden">
      <Sidebar/>
      {/* HomePage
      <button onClick={logout}>Logout</button> */}
    </div>
  )
}

export default HomePage
