import React,{useState,useRef, useEffect} from 'react'
import {useAuthStore} from "../store/useAuth.js"
import {Link} from "react-router-dom"
import {Flame,User,LogOut,Menu} from "lucide-react"
const Header = () => {
    const {authUser,logout}=useAuthStore();
    console.log("Auth user in header is "+authUser);
    const [dropdownOpen,setDropdownOpen]=useState(false)
    const [mobileMenuOpen,setMobileMenuOpen]=useState(false)
    const dropdownRef=useRef(null)
    useEffect(()=>{
        const handleClickOutside=(event)=>{
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
                setDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown",handleClickOutside)
        return ()=>{
            document.removeEventListener("mousedown",handleClickOutside)
        }
    },[])
  return (
    <header className="bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className='flex items-center space-x-2'>
            <Flame className='w-8 h-8 text-white'></Flame>
            </Link>
            <span className="text-2xl font-bold text-white hidden sm:inline">Tinder</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {authUser?(<div className='relative' ref={dropdownRef}>
                <button onClick={()=>setDropdownOpen(!dropdownOpen)} className='flex items-center space-x-2 focus:outline-none'>
                    <img src={authUser.image || '../../public/avatar.png' } alt="" 
                    className='w-10 h-10 object-cover rounded-full border-2 border-white'/>
                    <span className='text-white font-medium'>{authUser.name}</span>
                </button>
                {dropdownOpen && (<div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10'>
                    <Link to="/profile" 
                    onClick={()=>setDropdownOpen(false)}
                    className='flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100'>
                    <User className='mr-2' size={16}></User>
                    Profile
                    </Link>
                    <button onClick={logout} className='w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center'>
                        <LogOut className='mr-2' size={16} />
                        Logout
                    </button>
                </div>
            )}
            </div>):(<>
            <Link to="/auth" className='text-white hover:text-pink-200 transition-duration-150 ease-in-out'>Login</Link>
            <Link to="/auth" className='bg-white text-pink-600 hover:bg-pink-200 px-4 py-2 rounded-full transition-duration-150 ease-in-out'>Register</Link>
            </>
            )}
          </div>
            <div className="md:hidden">
                <button className="text-white focus:outline-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </div>
      </div>
      {mobileMenuOpen && 
      <div className="md:hidden bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {authUser ? (
                <>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700">Profile</Link>
                <button onClick={logout} className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700">Logout</button>
                </>
            ) : (
                <>
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700">Login</Link>
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium bg-white text-pink-600 hover:bg-pink-700">Register</Link>
                </>
            )}

          </div>

          </div>
      }
    </header>
    )
    }

export default Header
