import Banner from "/public/EventInfoPic.png";
const EventInfoBackgroundImg = () => {
    return (
  <div className="w-full relative bg-black h-[75vh]">
    <div className="w-full h-[75%]">
      <img
        className="w-full h-full object-cover"
        src={Banner.src}
        alt="Banner Image"
      />
    </div>
    <div className="absolute top-[55%] left-0 w-full h-[25%] z-0">
      <div className="w-full h-full bg-gradient-to-t from-black to-transparent" />
    </div>
  </div>
    )
}
export default EventInfoBackgroundImg;