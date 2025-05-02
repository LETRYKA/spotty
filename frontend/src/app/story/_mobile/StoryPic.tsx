"use client";
import Banner from "/public/storypic.png";
const StoryPic = () => {
    return (
        <div className="w-full h-screen">
        <img
        className=" h-full w-full object-fit object-cover overflow-hidden"
        src={Banner.src} 
        alt="Banner Image"
        />
    </div>
    )
}   
export default StoryPic;