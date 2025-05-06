import { Event } from "./Event";
import { Friendship } from "./Friendship";

export type User = {
  id: string;
  name: string;
  email: string;
  avatarImage: string;
  backgroundImage: string | null;
  batteryLevel: number | null;
  createdAt: string;
  phoneNumber: string | null;
  moodStatus: string | null;
  events: Event[];
  joinedEvents: Event[];
  friendsOf: Friendship[];
  friendships: Friendship[];
  locations: any[]; 
  stories: any[]; 
};