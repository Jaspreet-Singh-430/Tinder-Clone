import React from 'react'
import { useMatchStore } from '../store/useMatchStore'
const getFeedbackStyle=(swipeFeedback)=>{
if(swipeFeedback=="Passed")
    return "text-red-500";
if(swipeFeedback=="Liked")
    return "text-green-500";
if(swipeFeedback=="Matched")
    return "text-pink-500";
}
const getFeedbackText=(swipeFeedback)=>{
if(swipeFeedback=="Passed")
    return "Passed";
if(swipeFeedback=="Liked")
    return "Liked !";
if(swipeFeedback=="Matched")
    return "It's a match";
}
const SwipeFeedback = () => {
    const {swipeFeedback}=useMatchStore()
  return (
    <div className={`absolute top-10 left-0 right-0 text-center text-2xl font-bold
    ${getFeedbackStyle(swipeFeedback)}`}>
      {getFeedbackText(swipeFeedback)}
    </div>
  )
}

export default SwipeFeedback
