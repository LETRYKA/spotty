import CreatedEvents from "./createdEvent";
import JoinedEvent from "./joinedEvent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EventCards = () => {
  return (
    <div>
      <Tabs defaultValue="createdEvents" className="w-full mt-7 bg-re">
        <TabsList className="dark ml-9 " >
          <TabsTrigger className="w-96 dark" value="createdEvents">Created Events</TabsTrigger>
          <TabsTrigger value="JoinedEvent">Joined Events</TabsTrigger>
        </TabsList>
        <TabsContent value="createdEvents">
          <CreatedEvents />
        </TabsContent>
        <TabsContent value="JoinedEvent">
          <JoinedEvent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventCards;
