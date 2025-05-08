import CreateEventPic from "./_mobile/CreateEventPic";
import CreateEventSection from "./_mobile/CreateEventSection";
const CreateEventPage = () => {
    return (
        <div className="w-full h-screen relative sm:block md:hidden">
            <CreateEventPic/>
            <CreateEventSection/>
        </div>
    )
}
export default CreateEventPage; 