'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';

import {
  MeetingFormSchema,
  type State,
} from './meeting-validation';

import {
  addMeeting,
  updateMeeting as updateMeetingInDb,
  deleteMeeting as deleteMeetingInDb,
} from './meetings-db';

export type { State } from './meeting-validation';

export async function createMeeting(
  prevState: State,
  formData: FormData
): Promise<State> {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const validatedFields = MeetingFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: 'Please correct the errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const data = validatedFields.data;

    await addMeeting({
      date: data.date,
      meetingType: data.meetingType,
      presiding: data.presiding,
      conducting: data.conducting,

      announcements: data.announcements
        ? data.announcements.split('\n').filter(Boolean)
        : [],

      openingHymn: data.openingHymn,

      openingPrayer: data.openingPrayer,

      wardBusiness: data.wardBusiness,

      stakeBusiness: data.stakeBusiness === 'true',

      sacramentHymn: data.sacramentHymn,

      speakers: data.speakers,

      closingHymn: data.closingHymn,

      closingPrayer: data.closingPrayer,
    });

    revalidatePath('/meetings');
  } catch (error) {
    console.error('Failed to create meeting:', error);
    throw new Error('Failed to create meeting. Please try again.');
  }

  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  prevState: State,
  formData: FormData
): Promise<State> {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const validatedFields = MeetingFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: 'Please correct the errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const data = validatedFields.data;

    const updatedMeeting = await updateMeetingInDb(id, {
      date: data.date,
      meetingType: data.meetingType,
      presiding: data.presiding,
      conducting: data.conducting,

      announcements: data.announcements
        ? data.announcements.split('\n').filter(Boolean)
        : [],

      openingHymn: data.openingHymn,

      openingPrayer: data.openingPrayer,

      wardBusiness: data.wardBusiness,

      stakeBusiness: data.stakeBusiness === 'true',

      sacramentHymn: data.sacramentHymn,

      speakers: data.speakers,

      closingHymn: data.closingHymn,

      closingPrayer: data.closingPrayer,
    });

    if (!updatedMeeting) {
      throw new Error('Meeting not found.');
    }

    revalidatePath('/meetings');
  } catch (error) {
    console.error('Failed to update meeting:', error);
    throw new Error('Failed to update meeting. Please try again.');
  }

  redirect('/meetings');
}

export async function deleteMeeting(id: number): Promise<void> {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  try {
    const deleted = await deleteMeetingInDb(id);

    if (!deleted) {
      throw new Error('Meeting not found.');
    }

    revalidatePath('/meetings');
  } catch (error) {
    console.error('Failed to delete meeting:', error);
    throw new Error('Failed to delete meeting. Please try again.');
  }
}
