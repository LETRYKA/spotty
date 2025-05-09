import { Event } from "@/types/Event";

export const determineEventStatus = (event: Event): string => {
  const now = Date.now();
  const start = Date.parse(event.startAt);
  const end = Date.parse(event.endAt);

  if (event.isCancelled) return "CANCELLED";
  if (now < start) return "UPCOMING";
  if (now <= end) return "ONGOING";
  return "ENDED";
};

export const enrichEventsWithStatus = (
  events: Event[]
): (Event & { status: string })[] => {
  return events.map((event) => ({
    ...event,
    status: determineEventStatus(event),
  }));
};
