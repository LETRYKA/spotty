import JoinedEvent from "./joinedEvent";
import CreatedEvents from "./createdEvent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EventCards = () => {
  return (
    <div>
      <Tabs defaultValue="CreatedEvents" className="w-full mt-7 bg-re">
        <TabsList className="dark ml-9 " >
          <TabsTrigger className="w-96 dark" value="CreatedEvents">Үүсгэсэн Эвент</TabsTrigger>
          {/* <TabsTrigger value="InterestedEvent">Сонирхож байгаа Эвент</TabsTrigger> */}
          <TabsTrigger value="JoinedEvent">Нэгдсэн Эвент</TabsTrigger>
        </TabsList>
        <TabsContent value="CreatedEvents">
          <CreatedEvents />
        </TabsContent>
        {/* <TabsContent value="InterestedEvent">
          <JoinedEvent />
        </TabsContent> */}
        <TabsContent value="JoinedEvent">
          <JoinedEvent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventCards;
