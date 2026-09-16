import MeetingCard from '@/components/MeetingCard';
import { getMeetings } from '@/lib/meetings-db';

export default function MeetingsPage() {
  const meetings = getMeetings();

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold">All Sacrament Meetings</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      </div>
    </section>
  );
}