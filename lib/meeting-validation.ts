import { z } from 'zod';

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

export const MeetingFormSchema = z.object({
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
