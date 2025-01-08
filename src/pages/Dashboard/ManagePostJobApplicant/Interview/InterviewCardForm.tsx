import React from 'react';

import { LoadingOutlined } from '@ant-design/icons';

import { CustomCheckbox } from '../../../../components/Form/CustomCheckBox';
import { FormComponent } from '../../../../components/Form/FormComponent';
import usePickCandidate from '../../../../hooks/dashboard/jobs/usePickCandidate';
import {
  PickCandidateDataType,
  pickCandidateInitialValues,
  PickCandidateSchema,
} from '../../../../models/dashboard/jobs/pickCandidate';

const InterviewCardForm = () => {
  const { pickCandidate, loading } = usePickCandidate();

  const handleOnSubmit = (values: PickCandidateDataType, actions: any) => {
    pickCandidate(values);
  };

  if (loading) {
    return <LoadingOutlined />;
  }

  return (
    <FormComponent
      initialValues={pickCandidateInitialValues}
      schema={PickCandidateSchema}
      onSubmit={handleOnSubmit}
    >
      <CustomCheckbox name='candidate' id='candidate' submitOnClick>
        Pick this candidate
      </CustomCheckbox>
    </FormComponent>
  );
};

export default InterviewCardForm;
