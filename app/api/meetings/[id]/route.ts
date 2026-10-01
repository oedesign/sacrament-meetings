import { getMeetingById } from '@/lib/meetings-db';

interface MeetingRouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: Request,
  context: MeetingRouteContext
) {
  void request;

  const { id } = await context.params;

  const meetingId = Number(id);

  if (
    id.trim() === '' ||
    !Number.isInteger(meetingId) ||
    !Number.isFinite(meetingId)
  ) {
    return Response.json(
      { error: 'Invalid meeting ID.' },
      { status: 400 }
    );
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    return Response.json(
      { error: 'Meeting not found.' },
      { status: 404 }
    );
  }

  return Response.json(meeting);
}