import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({
  meeting,
}: MeetingCardProps) {
  return (
    <article className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-4">
        <p className="text-sm font-medium uppercase text-blue-600">
          {meeting.meetingType} meeting
        </p>

        <h2 className="mt-1 text-xl font-semibold text-gray-900">
          {new Date(`${meeting.date}T00:00:00`).toLocaleDateString(
            'en-US',
            {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }
          )}
        </h2>
      </div>

      <div className="space-y-1 text-sm text-gray-600">
        <p>
          <span className="font-medium text-gray-900">
            Presiding:
          </span>{' '}
          {meeting.presiding}
        </p>

        <p>
          <span className="font-medium text-gray-900">
            Conducting:
          </span>{' '}
          {meeting.conducting}
        </p>

        <p>
          <span className="font-medium text-gray-900">
            Speakers:
          </span>{' '}
          {meeting.speakers.length}
        </p>
      </div>

      <Link
        href={`/meetings/${meeting.id}`}
        className="mt-5 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        View Meeting
      </Link>
    </article>
  );
}