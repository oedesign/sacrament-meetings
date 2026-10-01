import Link from 'next/link';

export default function MeetingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h2 className="font-semibold text-gray-900">
            Meeting Programs
          </h2>

          <div className="flex gap-4 text-sm">
            <Link
              href="/meetings"
              className="text-gray-600 hover:text-blue-700"
            >
              All Meetings
            </Link>

            <Link
              href="/meetings/current"
              className="text-gray-600 hover:text-blue-700"
            >
              Current Meeting
            </Link>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}