export interface Event {
  id: string;
  title: string;
  startAt: string;
  endAt: string;
  isCancelled: boolean;
  owner: { name: string };
  categories: { emoji: string }[];
  participants: any[];
  participantLimit: number;
}
