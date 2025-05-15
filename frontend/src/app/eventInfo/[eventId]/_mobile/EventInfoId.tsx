import EventInfoBackgroundImg from "./_components/EventInfoBackgroundImg";
import EventInfoDetails from "./_components/EventInfoDetails";
interface Props {
    eventId: string
}
const EventInfoId = ({ eventId }: Props) => {
    return (
        <div className="w-full h-screen relative sm:block md:hidden">
            <EventInfoBackgroundImg/>
            <EventInfoDetails />
        </div>
    )
}
export default EventInfoId