import Banner from "/public/EventInfoPic.png";
const EventInfoBackgroundImg = () => {
    return (
        <div className="w-full h-screen relative bg-black">
            <div className="w-full h-[75%]">
                <img
                className="w-full h-full object-cover"
                src={Banner.src}
                alt="Banner Image"
                />
            </div>
            <div
                className="absolute top-[55%] left-0 w-full h-[25%] overflow-hidden z-0"
                style={{
                backgroundImage: `url(${Banner.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                filter: 'blur(8px)',
                transform: 'scale(1.02)',
                }}
            />
        </div>
    )
}
export default EventInfoBackgroundImg;