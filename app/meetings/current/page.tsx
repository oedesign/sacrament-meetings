import { redirect } from 'next/navigation';

import { getMeetings } from '@/lib/meetings-db';

function getMostRecentSunday(): string {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  return sunday.toISOString().split('T')[0];
}

export default function CurrentMeetingPage() {
  const sunday = getMostRecentSunday();
  const meetings = getMeetings(sunday);

  if (meetings.length > 0) {
    redirect(`/meetings/${meetings[0].id}`);
  }

  redirect('/meetings');
}