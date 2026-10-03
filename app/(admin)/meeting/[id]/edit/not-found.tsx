import Link from 'next/link';

export default function EditMeetingNotFound() {
  return (
    <main className="meeting-page">
      <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">
          Meeting Not Found
        </h1>

        <p className="mt-3 text-gray-600">
          We could not find the meeting you are trying to edit.
        </p>

        <Link
          href="/meetings"
          className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Back to Meetings
        </Link>
      </div>
    </main>
  );
}