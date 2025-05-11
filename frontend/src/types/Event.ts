export interface Event {
  id: string;
  title: string;
  startAt: string;
  endAt: string;
  isCancelled: boolean;
  owner: { name: string };
  isPrivate: boolean;
  description: string;
  categories?: { emoji: string }[];
  participants: { name: string; avatarImage: string; moodStatus: string }[];
  participantLimit?: number;
  galleryImages: string[];
}
