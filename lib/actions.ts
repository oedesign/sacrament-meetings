'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import {
  addMeeting,
  updateMeeting as updateMeetingInDb,
  deleteMeeting as deleteMeetingInDb,
} from './meetings-db';

const MeetingFormSchema = z.object({
  date: z.string().min(1, 'Date is required.'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general']),
  presiding: z.string().min(1, 'Presiding officer is required.'),
  conducting: z.string().min(1, 'Conducting officer is required.'),
  announcements: z.string().optional(),
  openingHymn: z.string().min(1, 'Opening hymn is required.'),
  openingPrayer: z.string().min(1, 'Opening prayer is required.'),
  wardBusiness: z.string().optional(),
  stakeBusiness: z.string().optional(),
  sacramentHymn: z.string().min(1, 'Sacrament hymn is required.'),
  speakers: z.string().optional(),
  closingHymn: z.string().min(1, 'Closing hymn is required.'),
  closingPrayer: z.string().min(1, 'Closing prayer is required.'),
});

export type State = {
  message: string;
  errors?: {
    [key: string]: string[];
  };
};

export async function createMeeting(
  prevState: State,
  formData: FormData
): Promise<State> {
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
      openingHymn: JSON.parse(data.openingHymn),
      openingPrayer: data.openingPrayer,
      wardBusiness: data.wardBusiness
        ? JSON.parse(data.wardBusiness)
        : [],
      stakeBusiness: data.stakeBusiness === 'true',
      sacramentHymn: JSON.parse(data.sacramentHymn),
      speakers: data.speakers
        ? JSON.parse(data.speakers)
        : [],
      closingHymn: JSON.parse(data.closingHymn),
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
      openingHymn: JSON.parse(data.openingHymn),
      openingPrayer: data.openingPrayer,
      wardBusiness: data.wardBusiness
        ? JSON.parse(data.wardBusiness)
        : [],
      stakeBusiness: data.stakeBusiness === 'true',
      sacramentHymn: JSON.parse(data.sacramentHymn),
      speakers: data.speakers
        ? JSON.parse(data.speakers)
        : [],
      closingHymn: JSON.parse(data.closingHymn),
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