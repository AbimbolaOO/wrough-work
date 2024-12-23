import React from 'react';

import useCreateJobInterviewTime from '../../../hooks/dashboard/jobs/useCreateJobInterviewTime';
import {
  CreateJobInterviewDataType,
  createJobInterviewInitialValues,
  CreateJobInterviewSchema,
} from '../../../models/dashboard/jobs/createJobInterview.model';
import CustomCalender from '../../Form/CustomCheckBox/CustomCalender';
import { FormComponent } from '../../Form/FormComponent';
import PlainModalContainer from '../PlainModalContainer';

const CalenderModal = () => {
  const { loading, createJobPostInterviewTime } = useCreateJobInterviewTime();
  const handleOnSubmit = (values: CreateJobInterviewDataType) => {
    createJobPostInterviewTime({ ...values, duration: '30' });
  };

  return (
    <PlainModalContainer>
      <FormComponent
        initialValues={createJobInterviewInitialValues}
        schema={CreateJobInterviewSchema}
        onSubmit={handleOnSubmit}
      >
        <CustomCalender
          id='interviewDate'
          name='interviewDate'
          isSubmitting={loading}
        />
      </FormComponent>
    </PlainModalContainer>
  );
};

export default CalenderModal;
