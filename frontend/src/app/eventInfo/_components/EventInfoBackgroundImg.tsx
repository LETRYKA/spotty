import Banner from "/public/EventInfoPic.png";

const EventInfoBackgroundImg = () => {
  return (
    <div className="absolute w-full bg-black h-[75vh] -z-10 overflow-hidden">
      <div className="w-full h-full relative">
        <img
          className="w-full h-full object-cover"
          src={Banner.src}
          alt="Banner Image"
        />
        <div className="w-full h-[40rem] absolute top-20 left-0 blur-gradient-mask pointer-events-none" />
        <div className="absolute bottom-0 w-full">
          <div className="w-full h-[30rem] bg-gradient-to-t from-[#00090D] to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default EventInfoBackgroundImg;
