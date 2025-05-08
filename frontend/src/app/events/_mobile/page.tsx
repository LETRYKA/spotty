import EventsCarousel from "./_components/EventsCarousel";
import UpcomingHeader from "./_components/UpcomingHeader";

const MobileAllEvents = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <UpcomingHeader />
      <EventsCarousel />
    </div>
  );
};
export default MobileAllEvents;
