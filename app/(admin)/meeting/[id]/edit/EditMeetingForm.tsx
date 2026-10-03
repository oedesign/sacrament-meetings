'use client';

import { useActionState } from 'react';
import { updateMeeting, type State } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

interface EditMeetingFormProps {
  meeting: SacramentMeeting;
}

const initialState: State = {
  message: '',
  errors: {},
};

export default function EditMeetingForm({
  meeting,
}: EditMeetingFormProps) {
  const updateMeetingWithId = updateMeeting.bind(null, meeting.id);

  const [state, formAction, pending] = useActionState(
    updateMeetingWithId,
    initialState,
  );

  return (
    <form action={formAction} className="meeting-form text-black">
      <p aria-live="polite">{state.message}</p>

      <div>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          name="date"
          type="date"
          defaultValue={meeting.date}
          aria-describedby="date-error"
        />
        <div id="date-error" aria-live="polite">
          {state.errors?.date?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="meetingType">Meeting Type</label>
        <select
          id="meetingType"
          name="meetingType"
          defaultValue={meeting.meetingType}
          aria-describedby="meetingType-error"
        >
          <option value="testimony">Testimony</option>
          <option value="regular">Regular</option>
          <option value="stake">Stake</option>
          <option value="general">General</option>
        </select>
        <div id="meetingType-error" aria-live="polite">
          {state.errors?.meetingType?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="presiding">Presiding</label>
        <input
          id="presiding"
          name="presiding"
          type="text"
          defaultValue={meeting.presiding}
          aria-describedby="presiding-error"
        />
        <div id="presiding-error" aria-live="polite">
          {state.errors?.presiding?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="conducting">Conducting</label>
        <input
          id="conducting"
          name="conducting"
          type="text"
          defaultValue={meeting.conducting}
          aria-describedby="conducting-error"
        />
        <div id="conducting-error" aria-live="polite">
          {state.errors?.conducting?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="announcements">Announcements</label>
        <textarea
          id="announcements"
          name="announcements"
          defaultValue={meeting.announcements?.join('\n') ?? ''}
          aria-describedby="announcements-error"
        />
        <div id="announcements-error" aria-live="polite">
          {state.errors?.announcements?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="openingHymn">Opening Hymn</label>
        <input
          id="openingHymn"
          name="openingHymn"
          type="text"
          defaultValue={JSON.stringify(meeting.openingHymn)}
          aria-describedby="openingHymn-error"
        />
        <div id="openingHymn-error" aria-live="polite">
          {state.errors?.openingHymn?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="openingPrayer">Opening Prayer</label>
        <input
          id="openingPrayer"
          name="openingPrayer"
          type="text"
          defaultValue={meeting.openingPrayer}
          aria-describedby="openingPrayer-error"
        />
        <div id="openingPrayer-error" aria-live="polite">
          {state.errors?.openingPrayer?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="wardBusiness">Ward Business</label>
        <textarea
          id="wardBusiness"
          name="wardBusiness"
          defaultValue={JSON.stringify(meeting.wardBusiness)}
          aria-describedby="wardBusiness-error"
        />
        <div id="wardBusiness-error" aria-live="polite">
          {state.errors?.wardBusiness?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="stakeBusiness">Stake Business</label>
        <select
          id="stakeBusiness"
          name="stakeBusiness"
          defaultValue={String(meeting.stakeBusiness)}
          aria-describedby="stakeBusiness-error"
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
        <div id="stakeBusiness-error" aria-live="polite">
          {state.errors?.stakeBusiness?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="sacramentHymn">Sacrament Hymn</label>
        <input
          id="sacramentHymn"
          name="sacramentHymn"
          type="text"
          defaultValue={JSON.stringify(meeting.sacramentHymn)}
          aria-describedby="sacramentHymn-error"
        />
        <div id="sacramentHymn-error" aria-live="polite">
          {state.errors?.sacramentHymn?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="speakers">Speakers</label>
        <textarea
          id="speakers"
          name="speakers"
          defaultValue={JSON.stringify(meeting.speakers)}
          aria-describedby="speakers-error"
        />
        <div id="speakers-error" aria-live="polite">
          {state.errors?.speakers?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="closingHymn">Closing Hymn</label>
        <input
          id="closingHymn"
          name="closingHymn"
          type="text"
          defaultValue={JSON.stringify(meeting.closingHymn)}
          aria-describedby="closingHymn-error"
        />
        <div id="closingHymn-error" aria-live="polite">
          {state.errors?.closingHymn?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="closingPrayer">Closing Prayer</label>
        <input
          id="closingPrayer"
          name="closingPrayer"
          type="text"
          defaultValue={meeting.closingPrayer}
          aria-describedby="closingPrayer-error"
        />
        <div id="closingPrayer-error" aria-live="polite">
          {state.errors?.closingPrayer?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      <button type="submit" disabled={pending}>
        {pending ? 'Updating...' : 'Update Meeting'}
      </button>
    </form>
  );
}