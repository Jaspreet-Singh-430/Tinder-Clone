import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { EffectCards } from 'swiper/modules';
import {useMatchStore} from "../store/useMatchStore"
import 'swiper/css';
// import 'swiper/css/controller'
import 'swiper/css/navigation'
import 'swiper/css/effect-cards'

const SwipeArea = () => {
    const {userProfiles,swipeRight,swipeLeft,getUserProfiles}=useMatchStore()
    const handleSwipe= (dir,user)=>{
        if(dir=='next') {
            // SetChanged(prev=>!prev)
            swipeLeft(user)
        }
        else if(dir=='prev') {
            // SetChanged(prev=>!prev)
            swipeRight(user)
        }
        //  getUserProfiles(23);

    }
    
  return (
    <div className='relative w-full max-w-sm h-[25rem]'>
        <Swiper
        modules={[EffectCards]}
        
      spaceBetween={10}
      slidesPerView={1}
      
      grabCursor={true}
      loop={false}
    //   rewind={true}
      effect={'cards'}
      className='mySwiper'
      onSlideChange={(e)=>{
        // console.log(e.activeIndex)
        console.log(e.swipeDirection)
        if(e.swipeDirection=='next') {
                if(e.activeIndex>1)
                handleSwipe(e.swipeDirection,userProfiles[e.activeIndex-2])
            }
            else if(e.swipeDirection=='prev'){

                if(e.activeIndex==userProfiles.length)
                    ;
                else
                    handleSwipe(e.swipeDirection,userProfiles[e.activeIndex])
            }
        }
    }
      onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide className='absolute top-10 shadow-none'>
            <div className='card bg-white w-96
                    h-[25rem] select-none rounded-lg overflow-hidden
                    border border-gray-200'>
                        <div className="flex flex-col items-center justify-center h-full">
                        <h3 className='font-bold px-5 text-2xl text-gray-800 text-center'>You can swipe the profile left to <span className='text-red-500'>dislike</span> and swipe right to <span className='text-green-500'>like</span></h3>
                        </div>
                    </div>
        </SwiperSlide>
            {userProfiles.map((user)=>(
                <SwiperSlide onSlideChange={(e)=>{
                    console.log(e)
                    handleSwipe(e.swipeDirection,user)
                }
            } 
                className='absolute top-10 shadow-none'
                key={user._id}>
                    <div className='card bg-white w-96
                    h-[25rem] select-none rounded-lg overflow-hidden
                    border border-gray-200'>
                        <figure className='px-4 pt-4 h-3/4'>
                        <img src={(user.profilePicture.startsWith("Male") || user.profilePicture.startsWith("Female") || user.profilePicture=="") ? "/avatar.png":user.profilePicture} alt={user.name}
                        className="rounded-lg object-cover h-full pointer-events-none" />
                        </figure>
                        <figure className="card-body bg-gradient-to-b from-white to-pink-50">
                            <h2 className="card-title text-2xl text-gray-800">
                                {user.name}, {user.age}
                            </h2>
                            <p className="text-gray-600">{user.bio}</p>
                        </figure>

                    </div>
                </SwiperSlide>

            ))}
<SwiperSlide className='absolute top-10 shadow-none'>
    <div className='card bg-white w-96
                    h-[25rem] select-none rounded-lg overflow-hidden
                    border border-gray-200'>
                        <h3 className=' flex items-center justify-center h-full font-bold px-5 text-2xl text-gray-800 '>No more profiles!</h3>
                    </div>
</SwiperSlide>
        </Swiper>
      
    </div>
  )
}

export default SwipeArea
