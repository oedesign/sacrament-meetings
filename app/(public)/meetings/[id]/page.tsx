import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import type { SacramentMeeting } from '@/lib/types';

function isSacramentMeeting(
  value: unknown
): value is SacramentMeeting {
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

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function MeetingPage({
  params,
}: MeetingPageProps) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/meetings/${id}`,
    {
      cache: 'no-store',
    }
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error('Failed to fetch meeting.');
  }

  const data: unknown = await response.json();

  if (!isSacramentMeeting(data)) {
    throw new Error('Invalid meeting API response.');
  }

  return (
    <section className="px-6 py-12">
      <MeetingDetail meeting={data} />
    </section>
  );
}