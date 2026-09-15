import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

import MeetingDetail from '@/components/MeetingDetail';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getMeeting(
  id: string
): Promise<SacramentMeeting> {
  const headersList = await headers();

  const host = headersList.get('host');
  const protocol =
    headersList.get('x-forwarded-proto') ?? 'http';

  const response = await fetch(
    `${protocol}://${host}/api/meetings/${id}`
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error('Failed to fetch meeting.');
  }

  return response.json();
}

export default async function MeetingPage({
  params,
}: MeetingPageProps) {
  const { id } = await params;
  const meeting = await getMeeting(id);

  return (
    <section className="px-6 py-12">
      <MeetingDetail meeting={meeting} />
    </section>
  );
}