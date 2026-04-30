import React,{useEffect} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { EffectCards } from 'swiper/modules';
import {useMatchStore} from "../store/useMatchStore"
import 'swiper/css';
// import 'swiper/css/controller'
import 'swiper/css/navigation'
import 'swiper/css/effect-cards'

const SwipeArea = () => {
    const {userProfiles,swipeRight,swipeLeft}=useMatchStore()
    // useEffect(()=>{
    //     getUserProfiles();
    //   },[])
    const handleSwipe=(dir,user)=>{
        if(dir=='next')
            swipeRight(user)
        else if(dir=='prev')
            swipeLeft(user)
    }
  return (
    <div className='relative w-full max-w-sm h-[25rem]'>
        <Swiper
        modules={[EffectCards]}
      spaceBetween={10}
      slidesPerView={1}
      grabCursor={true}
      loop={false}
      effect={'cards'}
      className='mySwiper'
    //   onSlideChange={(e)=>console.log(e)}
      onSlideChange={(e)=>{
        
        console.log(e)
        handleSwipe(e.swipeDirection,userProfiles[e.activeIndex])
    //       const total = userProfiles.length;

    // // If user tries to go before first slide
    // if (e.activeIndex === 0 && e.swipeDirection === 'prev') {
    //   e.slideTo(total - 1);
    //   return;
    // }

    // // If user tries to go beyond last slide
    // if (
    //   e.activeIndex === total - 1 &&
    //   e.swipeDirection === 'next'
    // ) {
    //   e.slideTo(0);
    //   return;
    // }
    }}
      onSwiper={(swiper) => console.log(swiper)}
      >
            {userProfiles.map((user)=>(
                <SwiperSlide className='absolute top-10 shadow-none'
                key={user._id}>
                    <div className='card bg-white w-96
                    h-[25rem] select-none rounded-lg overflow-hidden
                    border border-gray-200'>
                        <figure className='px-4 pt-4 h-3/4'>
                        <img src={(user.profilePicture.startsWith("Male") || user.profilePicture.startsWith("Female")) ? "/avatar.png":user.profilePicture} alt={user.name}
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

        </Swiper>
      
    </div>
  )
}

export default SwipeArea
