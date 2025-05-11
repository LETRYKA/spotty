export interface Event {
    id: string;
    title: string;
    description: string;
    lat: number;
    lng: number;
    isPrivate: boolean;
    hiddenFromMap: boolean;
    password: string | null;
    ownerId: string;
    participantLimit: number | null;
    createdAt: string;
    startAt: string;
    endAt: string | null;
    status: string;
    participants: {
        id: string;
        avatarImage: string;
        name: string;
        moodStatus: string;
    }[];
    galleryImages: string[];
    owner: {
        id: string;
        email: string;
        name: string;
        phoneNumber: string | null;
        isVerified: boolean;
        avatarImage: string | null;
        backgroundImage: string | null;
        moodStatus: string | null;
        batteryLevel: number | null;
        createdAt: string;
    };
}

export interface EventFormValues {
    title: string;
    description: string;
    lat: number;
    lng: number;
    isPrivate: boolean;
    hiddenFromMap: boolean;
    password: string;
    startAt: Date;
    endAt: Date;
    participantLimit?: number;
    categories: string[];
    backgroundImage: string | null;
    galleryImages: string[];
  }