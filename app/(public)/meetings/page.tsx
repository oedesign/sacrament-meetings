import MeetingCard from '@/components/MeetingCard';
import {
  getMeetings,
  getMeetingsTotalPages,
} from '@/lib/meetings-db';
import { MeetingSearch } from '@/components/MeetingSearch';

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

  const parsedPage = Number(params.page ?? '1');
  const page =
    Number.isInteger(parsedPage) && parsedPage > 0
      ? parsedPage
      : 1;

  const meetings = await getMeetings(query, page);
  const totalPages = await getMeetingsTotalPages(query);

  const previousPage = page - 1;
  const nextPage = page + 1;

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold text-blue-600">
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