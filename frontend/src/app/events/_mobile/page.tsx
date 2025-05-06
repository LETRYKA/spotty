import EventsCarousel from "./_components/EventsCarousel";
import UpcomingHeader from "./_components/UpcomingHeader";

const MobileAllEvents = () => {
  return (
    <div className="w-full h-full flex flex-col py-10 justify-between">
      <div className="w-full h-auto px-8">
        <UpcomingHeader />
      </div>
      <div className="w-full overflow-hidden pb-20">
        <EventsCarousel />
      </div>
    </div>
  );
};
export default MobileAllEvents;
