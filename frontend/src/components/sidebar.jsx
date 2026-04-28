import React,{useState} from 'react'
import {X,Loader,Heart,MessageCircle} from "lucide-react"
import {Link} from "react-router-dom"
const Sidebar = () => {
    const [isOpen,setOpen]=useState(true);
    const loading=false;
    const matches=[{
        id:1,name:"jack"
    },{id:2,name:"Hagrid"}];
    const toggleSidebar=()=>{
        setOpen(!isOpen)
    }
  return (
    <>
    <div className={`fixed inset-y-0 left-0 z-10 w-64 shadow-md overflow-hidden
    transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-white
    lg:translate-x-0 lg:static lg:w-1/4`}>
        <div className="flex flex-col h-full">
            <div className="p-4 pb-[27px] border-b border-pink-200
            flex justify-between items-center">
                <h2 className="text-xl font-bold text-pink-600">Matches</h2>
                <button className='lg:hidden p-1 text-gray-500 hover:text-gray-700
                focus:outline-none' onClick={toggleSidebar}>
                    <X size={24}/>
                </button>
            </div>
      <div className="flex-grow overflow-y-auto p-4 z-10 relative">
    {loading ? <LoadingState/> : matches.length == 0 ? <NoMatchesFound/>:(
        matches.map((match)=>(
            <Link key={match.id} to={`/chat/${match.id}`}>
                <div className="flex items-center mb-4 cursor-pointer hover:bg-pink-50
                p-2 rounded-lg transition-colors duration-300">
                    <img src={match.image || "/avatar.png"} alt=""
                    className="w-12 h-12 rounded-full object-cover mr-3 border-2
                    border-pink-300" />
                    <h3 className="font-semibold text-gray-800">{match.name}</h3>
                </div>

                
            </Link>
        ))
    )}    
    </div>      
        </div>
    </div>
    <button className="lg:hidden bg-pink-500 rounded-md z-0 fixed top-4 left-4 p-2 text-white hover:text-gray-700 focus:outline-none" onClick={toggleSidebar}>
        <MessageCircle size={24}/>
    </button>
    </>
  )
}

export default Sidebar

const LoadingState=()=>(
    <div className="flex flex-col items-center justify-center h-full text-center">
        <Loader className=" text-pink-500 mb-4 animate-spin" size={48}/>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading matches...</h3>
        <p className="text-gray-500 max-w-xs">We are finding your matches. This might take a moment...</p>
    </div>
)
const NoMatchesFound=()=>(
    <div className="flex flex-col items-center justify-center h-full text-center">
        <Heart className=" text-pink-500 mb-4" size={48}/>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No matches found</h3>
        <p className="text-gray-500 max-w-xs">We couldn't find any matches for you. Try adjusting your preferences.</p>
    </div>
)