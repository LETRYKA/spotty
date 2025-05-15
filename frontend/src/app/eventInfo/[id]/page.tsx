"use client"
import { useParams } from 'next/navigation';
import EventInfoId from './_mobile/EventInfoId';
const EventInfoPage = () => {
  const params = useParams();
  const id = params?.id;

  return <div className="h-full w-full text-white">Event ID: {id} hello 
  <EventInfoId/>
  </div>;
};

export default EventInfoPage;