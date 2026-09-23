import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/types';

function isSacramentMeeting(value: unknown): value is SacramentMeeting {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const meeting = value as Record<string, unknown>;

  return (
    typeof meeting.id === 'number' &&
    typeof meeting.date === 'string' &&
    typeof meeting.meetingType === 'string' &&
    typeof meeting.presiding === 'string' &&
    typeof meeting.conducting === 'string'
  );
}

export default async function MeetingsPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/meetings`,
    {
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch meetings.');
  }

  const data: unknown = await response.json();

  if (
    !Array.isArray(data) ||
    !data.every(isSacramentMeeting)
  ) {
    throw new Error('Invalid meetings API response.');
  }

  const meetings = data;

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold">
          All Sacrament Meetings
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
            />
          ))}
        </div>
      </div>
    </section>
  );
}