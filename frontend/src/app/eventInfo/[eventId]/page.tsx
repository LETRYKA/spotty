import EventInfoId from './_mobile/EventInfoId';

export default async function EventInfoPage({
  params: paramsPromise,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await paramsPromise;

  return (
    <div className="h-full w-full text-white">
      <EventInfoId eventId={eventId} />
    </div>
  );
}
