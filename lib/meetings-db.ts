import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
    {
    id: 6,
    date: '2026-09-13',
    meetingType: 'regular',
    presiding: 'Bishop Johnson',
    conducting: 'Sister Brown',
    announcements: [
      'Ward conference will be held next Sunday.',
      'Youth activity will be held on Wednesday evening.'
    ],
    openingHymn: {
      number: 85,
      title: 'How Firm a Foundation'
    },
    openingPrayer: 'Brother Davis',
    wardBusiness: [
      {
        description: 'Sustaining of new ward leaders'
      }
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: 'In Remembrance of Thy Suffering'
    },
    speakers: [
      {
        name: 'Sister Williams',
        topic: 'Strengthening Our Faith',
        type: 'speaker'
      },
      {
        name: 'Brother Anderson',
        topic: 'Serving in the Church',
        type: 'speaker'
      },
      {
        name: 'Ward Choir',
        topic: 'Special Musical Number',
        type: 'musical-number'
      }
    ],
    closingHymn: {
      number: 223,
      title: 'Have I Done Any Good?'
    },
    closingPrayer: 'Sister Smith'
  },
  {
    id: 1,
    date: '2026-09-06',
    meetingType: 'regular',
    presiding: 'Bishop Johnson',
    conducting: 'Brother Williams',
    announcements: [
      'Ward temple night is September 12.',
      'Youth activity will be held on Wednesday.'
    ],
    openingHymn: {
      number: 2,
      title: 'The Spirit of God'
    },
    openingPrayer: 'Sister Brown',
    wardBusiness: [
      {
        description: 'Sustaining of new Primary presidency'
      }
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: 'In Remembrance of Thy Suffering'
    },
    speakers: [
      {
        name: 'Sister Davis',
        topic: 'Faith in Jesus Christ',
        type: 'speaker'
      },
      {
        name: 'Youth Choir',
        topic: 'Special Musical Number',
        type: 'musical-number'
      },
      {
        name: 'Brother Smith',
        topic: 'Following the Savior',
        type: 'speaker'
      }
    ],
    closingHymn: {
      number: 31,
      title: 'O God, Our Help in Ages Past'
    },
    closingPrayer: 'Brother Anderson'
  },

  {
    id: 2,
    date: '2026-08-30',
    meetingType: 'testimony',
    presiding: 'Bishop Johnson',
    conducting: 'Sister Williams',
    announcements: [
      'Relief Society activity is scheduled for September 5.'
    ],
    openingHymn: {
      number: 81,
      title: 'Press Forward, Saints'
    },
    openingPrayer: 'Brother Davis',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 181,
      title: 'Jesus of Nazareth, Savior and King'
    },
    speakers: [],
    closingHymn: {
      number: 227,
      title: 'There Is Sunshine in My Soul Today'
    },
    closingPrayer: 'Sister Anderson'
  },

  {
    id: 3,
    date: '2026-08-23',
    meetingType: 'regular',
    presiding: 'Bishop Johnson',
    conducting: 'Brother Anderson',
    announcements: [
      'Ward choir practice begins at 6:00 PM on Thursday.'
    ],
    openingHymn: {
      number: 85,
      title: 'How Firm a Foundation'
    },
    openingPrayer: 'Sister Smith',
    wardBusiness: [
      {
        description: 'Sustaining of new Sunday School teacher'
      }
    ],
    stakeBusiness: true,
    sacramentHymn: {
      number: 194,
      title: 'There Is a Green Hill Far Away'
    },
    speakers: [
      {
        name: 'Brother Williams',
        topic: 'The Importance of Prayer',
        type: 'speaker'
      },
      {
        name: 'Sister Brown',
        topic: 'Serving Others',
        type: 'speaker'
      }
    ],
    closingHymn: {
      number: 223,
      title: 'Have I Done Any Good?'
    },
    closingPrayer: 'Brother Davis'
  },

  {
    id: 4,
    date: '2026-08-16',
    meetingType: 'regular',
    presiding: 'Bishop Johnson',
    conducting: 'Sister Brown',
    announcements: [
      'Stake conference information will be announced next Sunday.'
    ],
    openingHymn: {
      number: 89,
      title: 'The Lord Is My Light'
    },
    openingPrayer: 'Brother Smith',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 116,
      title: 'Come, Follow Me'
    },
    speakers: [
      {
        name: 'Sister Anderson',
        topic: 'Building Strong Families',
        type: 'speaker'
      },
      {
        name: 'Brother Williams',
        topic: 'Living the Gospel Daily',
        type: 'speaker'
      }
    ],
    closingHymn: {
      number: 219,
      title: 'Because I Have Been Given Much'
    },
    closingPrayer: 'Sister Davis'
  },

  {
    id: 5,
    date: '2026-08-09',
    meetingType: 'stake',
    presiding: 'Stake President Miller',
    conducting: 'Brother Johnson',
    announcements: [
      'Stake youth conference registration is now open.'
    ],
    openingHymn: {
      number: 96,
      title: 'Dearest Children, God Is Near You'
    },
    openingPrayer: 'Sister Williams',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: {
      number: 172,
      title: 'In Humility, Our Savior'
    },
    speakers: [
      {
        name: 'President Miller',
        topic: 'Strengthening Families',
        type: 'speaker'
      },
      {
        name: 'Sister Johnson',
        topic: 'Faith and Service',
        type: 'speaker'
      }
    ],
    closingHymn: {
      number: 134,
      title: 'I Believe in Christ'
    },
    closingPrayer: 'Brother Brown'
  }
];

export function getMeetings(
  date?: string | null
): SacramentMeeting[] {
  if (date) {
    return meetings.filter((meeting) => meeting.date === date);
  }

  return meetings;
}

export function getMeetingById(
  id: number
): SacramentMeeting | null {
  return meetings.find((meeting) => meeting.id === id) ?? null;
}