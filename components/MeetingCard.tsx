import Link from 'next/link';
import { deleteMeeting } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
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
            },
          )}
        </h2>
      </div>

      <div className="space-y-1 text-sm text-gray-600">
        <p>
          <span className="font-medium text-gray-900">Presiding:</span>{' '}
          {meeting.presiding}
        </p>

        <p>
          <span className="font-medium text-gray-900">Conducting:</span>{' '}
          {meeting.conducting}
        </p>

        <p>
          <span className="font-medium text-gray-900">Speakers:</span>{' '}
          {meeting.speakers.length}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href={`/meetings/${meeting.id}`}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          View Meeting
        </Link>

        <Link
          href={`/meeting/${meeting.id}/edit`}
          className="rounded-md border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
        >
          Edit
        </Link>

        <form action={deleteMeeting.bind(null, meeting.id)}>
          <button
            type="submit"
            className="rounded-md border border-red-600 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </form>
      </div>
    </article>
  );
}