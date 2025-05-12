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
  participantLimit?: number;
  galleryImages: string[];
  date: string;
  participants: Array<{
    id: string;
    name: string;
    avatarImage: string;
    moodStatus: string;
  }>;
}
