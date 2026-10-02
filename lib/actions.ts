'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import {
  addMeeting,
  updateMeeting as updateMeetingInDb,
  deleteMeeting as deleteMeetingInDb,
} from './meetings-db';

const HymnSchema = z.object({
  number: z.number().int().positive(),
  title: z.string().min(1),
});

const SpeakerItemSchema = z.object({
  name: z.string().min(1),
  topic: z.string().min(1),
  type: z.enum(['speaker', 'musical-number']),
});

const WardBusinessItemSchema = z.object({
  description: z.string().min(1),
});

const jsonHymnField = (fieldName: string) =>
  z
    .string()
    .min(1, `${fieldName} is required.`)
    .refine(
      (value) => {
        try {
          const parsed = JSON.parse(value);
          return HymnSchema.safeParse(parsed).success;
        } catch {
          return false;
        }
      },
      {
        message: `${fieldName} must be valid JSON with a hymn number and title.`,
      }
    )
    .transform((value) => JSON.parse(value) as z.infer<typeof HymnSchema>);

const optionalJsonArrayField = <T extends z.ZodType>(schema: T) =>
  z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;

        try {
          const parsed = JSON.parse(value);

          if (!Array.isArray(parsed)) {
            return false;
          }

          return z.array(schema).safeParse(parsed).success;
        } catch {
          return false;
        }
      },
      {
        message: 'This field must contain valid JSON.',
      }
    )
    .transform((value) => {
      if (!value) return [];

      return JSON.parse(value) as z.infer<typeof schema>[];
    });

const MeetingFormSchema = z.object({
  date: z.string().min(1, 'Date is required.'),

  meetingType: z.enum(
    ['testimony', 'regular', 'stake', 'general'],
    'Please select a valid meeting type.'
  ),

  presiding: z.string().min(1, 'Presiding officer is required.'),

  conducting: z.string().min(1, 'Conducting officer is required.'),

  announcements: z.string().optional(),

  openingHymn: jsonHymnField('Opening hymn'),

  openingPrayer: z.string().min(1, 'Opening prayer is required.'),

  wardBusiness: optionalJsonArrayField(WardBusinessItemSchema),

  stakeBusiness: z.enum(['true', 'false']),

  sacramentHymn: jsonHymnField('Sacrament hymn'),

  speakers: optionalJsonArrayField(SpeakerItemSchema),

  closingHymn: jsonHymnField('Closing hymn'),

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