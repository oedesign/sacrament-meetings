import MeetingCard from '@/components/MeetingCard';
import { getMeetingsTotalPages } from '@/lib/meetings-db';
import type { SacramentMeeting } from '@/lib/types';
import { MeetingSearch } from '@/components/MeetingSearch';

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

export default async function MeetingsPage({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;

  const query = params.query ?? '';
  const page = Number(params.page ?? '1');

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

  const response = await fetch(
    `${baseUrl}/api/meetings?query=${encodeURIComponent(query)}&page=${page}`,
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

  const totalPages = await getMeetingsTotalPages(query);

  const previousPage = page - 1;
  const nextPage = page + 1;

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold">
          All Sacrament Meetings
        </h1>

        <div className="mb-8">
             <MeetingSearch />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
            />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          {page > 1 ? (
            <a
              href={`/meetings?query=${encodeURIComponent(
                query
              )}&page=${previousPage}`}
              className="rounded-md bg-black px-4 py-2 text-white hover:opacity-80"
            >
              Previous
            </a>
          ) : (
            <span className="rounded-md bg-gray-200 px-4 py-2 text-gray-400">
              Previous
            </span>
          )}

          <span className="text-sm font-medium text-gray-900">
                 Page {page} of {totalPages}
         </span>

          {page < totalPages ? (
            <a
              href={`/meetings?query=${encodeURIComponent(
                query
              )}&page=${nextPage}`}
              className="rounded-md bg-black px-4 py-2 text-white"
            >
              Next
            </a>
          ) : (
            <span className="rounded-md bg-gray-200 px-4 py-2 text-gray-400">
              Next
            </span>
          )}
        </div>
      </div>
    </section>
  );
}