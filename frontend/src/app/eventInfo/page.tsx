import EventInfoBackgroundImg from "./_components/EventInfoBackgroundImg";
import EventInfoDetails from "./_components/EventInfoDetails";

const EventInfo = () => {
  return (
    <div className="w-full h-screen relative sm:block md:hidden">
      <EventInfoBackgroundImg />
      <EventInfoDetails />
    </div>
  );
};
export default EventInfo;
