'use client';

import Link from 'next/link';

interface MeetingsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MeetingsError({
  error,
  reset,
}: MeetingsErrorProps) {
  console.error(error);

  return (
    <main className="meeting-page">
      <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">
          Something went wrong
        </h1>

        <p className="mt-3 text-gray-600">
          We could not load the meetings. Please try again.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Try Again
          </button>

          <Link
            href="/meetings"
            className="rounded-md border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
          >
            Back to Meetings
          </Link>
        </div>
      </div>
    </main>
  );
}