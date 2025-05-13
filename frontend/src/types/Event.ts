export type Event = {
  id: string;
  title: string
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
  isCancelled?: boolean;
  owner: {
    name: string;
  };
  participants: [
    {
      id: string;
      name: string;
      email: string;
      avatarImage?: string;
      phoneNumber?: string;
      isVerified: boolean;
      batteryLevel?: number;
      moodStatus?: string;
      backgroundImage?: string;
      locations: {
        lat: number;
        lng: number;
      }[];
    }
  ];
  categories: [
    {
      id: string;
      name: string;
      emoji: string;
    }
  ];
};