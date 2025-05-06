import EventInfoBackgroundImg from "./_components/EventInfoBackgroundImg";
import EventInfoDetails from "./_components/EventInfoDetails";

const EventInfo = () => {
    return (
        <div className="w-full h-full">
            <div className="relative">
                <EventInfoBackgroundImg />
            </div>
            <div className="absolute top-0 py-[40px] px-[30px] w-full">
                <EventInfoDetails/>
            </div>
        </div>
    )
}
export default EventInfo;   