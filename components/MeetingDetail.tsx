import type { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({
  meeting,
}: MeetingDetailProps) {
  return (
    <article className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-sm">
      <header className="border-b pb-6 text-center">
        <p className="text-sm font-medium uppercase text-blue-600">
          {meeting.meetingType} meeting
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Sacrament Meeting
        </h1>

        <p className="mt-2 text-gray-600">
          {new Date(`${meeting.date}T00:00:00`).toLocaleDateString(
            'en-US',
            {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }
          )}
        </p>

        <div className="mt-4 text-sm text-gray-600">
          <p>Presiding: {meeting.presiding}</p>
          <p>Conducting: {meeting.conducting}</p>
        </div>
      </header>

      <div className="mt-8 space-y-8">
        {meeting.announcements &&
          meeting.announcements.length > 0 && (
            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                Announcements
              </h2>

              <ul className="list-disc space-y-2 pl-6 text-gray-700">
                {meeting.announcements.map((announcement) => (
                  <li key={announcement}>{announcement}</li>
                ))}
              </ul>
            </section>
          )}

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            Opening
          </h2>

          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Opening Hymn:</span>{' '}
              #{meeting.openingHymn.number} —{' '}
              {meeting.openingHymn.title}
            </p>

            <p>
              <span className="font-semibold">Opening Prayer:</span>{' '}
              {meeting.openingPrayer}
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            Ward Business
          </h2>

          {meeting.wardBusiness.length > 0 ? (
            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              {meeting.wardBusiness.map((item) => (
                <li key={item.description}>
                  {item.description}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">
              No ward business.
            </p>
          )}

          <p className="mt-3 text-gray-700">
            <span className="font-semibold">
              Stake Business:
            </span>{' '}
            {meeting.stakeBusiness ? 'Yes' : 'No'}
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            Sacrament
          </h2>

          <p className="text-gray-700">
            <span className="font-semibold">Sacrament Hymn:</span>{' '}
            #{meeting.sacramentHymn.number} —{' '}
            {meeting.sacramentHymn.title}
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            Speakers & Musical Numbers
          </h2>

          {meeting.speakers.length > 0 ? (
            <div className="space-y-4">
              {meeting.speakers.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="rounded-md border p-4"
                >
                  <p className="font-semibold text-gray-900">
                    {item.name}
                  </p>

                  <p className="text-sm capitalize text-gray-600">
                    {item.type.replace('-', ' ')}
                  </p>

                  {item.topic && (
                    <p className="mt-1 text-gray-700">
                      {item.topic}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              No speakers or musical numbers listed.
            </p>
          )}
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            Closing
          </h2>

          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Closing Hymn:</span>{' '}
              #{meeting.closingHymn.number} —{' '}
              {meeting.closingHymn.title}
            </p>

            <p>
              <span className="font-semibold">Closing Prayer:</span>{' '}
              {meeting.closingPrayer}
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}