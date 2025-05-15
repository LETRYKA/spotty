import EventInfoBackgroundImg from "./[id]/_mobile/_components/EventInfoBackgroundImg";
import EventInfoDetails from "./[id]/_mobile/_components/EventInfoDetails";

const EventInfo = () => {
  return (
    <div className="w-full h-screen relative sm:block md:hidden">
      <EventInfoBackgroundImg />
      <EventInfoDetails />
    </div>
  );
};
export default EventInfo;
