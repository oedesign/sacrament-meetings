import { notFound } from 'next/navigation';
import { getMeetingById } from '@/lib/meetings-db';
import EditMeetingForm from './EditMeetingForm';

interface EditMeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (Number.isNaN(meetingId)) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <main className="meeting-page">
      <h1 className="text-blue-600">Edit Sacrament Meeting</h1>

      <EditMeetingForm meeting={meeting} />
    </main>
  );
}