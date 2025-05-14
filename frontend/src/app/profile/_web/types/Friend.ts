export type Friend = {
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
};
