import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 overflow-hidden rounded-xl">
            <Image
              src="/mormon-church-meeting1.jpg"
              alt="Church meeting building"
              width={1200}
              height={600}
              className="h-auto w-full object-cover"
            />
      </div>
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Sacrament Meeting Planner
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Plan and review your ward&apos;s sacrament meetings.
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          Easily view meeting programs, announcements, hymns,
          speakers, prayers, and ward business for current and past
          meetings.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/meetings"
            className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            View All Meetings
          </Link>

          <Link
            href="/meetings/current"
            className="rounded-md border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 hover:bg-gray-50"
          >
            View Current Meeting
          </Link>
        </div>
      </div>
    </section>
  );
}