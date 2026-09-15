import { headers } from 'next/headers';

import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/types';

async function getMeetings(): Promise<SacramentMeeting[]> {
  const headersList = await headers();

  const host = headersList.get('host');
  const protocol =
    headersList.get('x-forwarded-proto') ?? 'http';

  const response = await fetch(
    `${protocol}://${host}/api/meetings`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch meetings.');
  }

  return response.json();
}

export default async function MeetingsPage() {
  const meetings = await getMeetings();

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Sacrament Meetings
        </h1>

        <p className="mt-2 text-gray-600">
          View current and past sacrament meeting programs.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {meetings.map((meeting) => (
          <MeetingCard
            key={meeting.id}
            meeting={meeting}
          />
        ))}
      </div>
    </section>
  );
}