import React, { useEffect, useRef } from 'react';

import {
  mailingListInitialValues,
  MailingListSchema,
} from '../../../models/mailingList/mailingList.model';
import CustomCalender from '../../Form/CustomCheckBox/CustomCalender';
import { FormComponent } from '../../Form/FormComponent';
import PlainModalContainer from '../PlainModalContainer';

const CalenderModal = () => {
  return (
    <PlainModalContainer>
      <FormComponent
        initialValues={mailingListInitialValues}
        schema={MailingListSchema}
        onSubmit={onsubmit}
        className='flex'
      >
        <CustomCalender
          label=''
          id='Date'
          name='Date'
          placeholder='Enter your email address '
          className='spanTwo mailingList'
        />
      </FormComponent>
    </PlainModalContainer>
  );
};

export default CalenderModal;
