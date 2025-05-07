export type Event = {
  id: string;
  title: string;
  description: string;
  lat: number;
  lng: number;
  status: string;
  backgroundImage: string;
  createdAt: string;
  endAt: string;
  galleryImages: string[];
  hiddenFromMap: boolean;
  isPrivate: boolean;
  ownerId: string;
  participantLimit: number;
  password: string | null;
  startAt: string;
  formattedStartAt?: string;
};