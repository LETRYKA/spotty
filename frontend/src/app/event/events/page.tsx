import EventsCarousel from "./_components/EventsCarousel";
import UpcomingHeader from "./_components/UpcomingHeader";

const AllEvents = () => {
    return (
        <div className="w-full flex flex-col gap-[54px]">
            <div>
                <UpcomingHeader/>
            </div>
            <div>
                <EventsCarousel/>
            </div>
        </div>
    )
}
export default AllEvents;