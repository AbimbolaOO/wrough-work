import React from 'react';

import styled from '@emotion/styled';

import useApplyToJobPostWithResume from '../../../hooks/dashboard/jobs/useApplyToJobPostWithResume';
import {
  ApplyToJobPostWithResumeDataType,
  applyToJobPostWithResumeInitialValues,
  ApplyToJobPostWithResumeSchema,
} from '../../../models/dashboard/jobs/applyToJobPostWithResume.model';
import ValidatingFormSubmitButton from '../../Button/FormSubmitButton';
import CustomResumeUploadButton from '../../Form/CustomResumeUploadButton';
import CustomSelectField from '../../Form/CustomSelectField';
import { FormComponent } from '../../Form/FormComponent';
import ModalContainer from '../ModalContainer';

interface ApplyForJobModalProps {
  jobId: string;
}

const ApplyForJobModal: React.FC<ApplyForJobModalProps> = ({ jobId }) => {
  const { applyToJobPostWithResume, loading } = useApplyToJobPostWithResume();

  const handleOnSubmit = (
    values: ApplyToJobPostWithResumeDataType,
    actions: any
  ) => {
    applyToJobPostWithResume(values, jobId, () =>
      actions.resetForm({ values: applyToJobPostWithResumeInitialValues })
    );
  };
  return (
    <ModalContainer width='761px' padding='25px 41px 55px' marginTop='164px'>
      <Container>
        <FormComponent
          initialValues={applyToJobPostWithResumeInitialValues}
          schema={ApplyToJobPostWithResumeSchema}
          onSubmit={handleOnSubmit}
        >
          <InputsArea>
            <InputDescription>
              <div>Your Resume</div>
              <div>
                Please make sure to select the right resume for the job or
                upload a new one
              </div>
            </InputDescription>

            <FormInputs>
              <CustomSelectField
                id='resumeUrl'
                name='resumeUrl'
                optionData={['Pharma.pdf', 'Dentist.jpeg', 'Doctor.png']}
              />

              <CustomResumeUploadButton
                id='resumeFile'
                name='resumeFile'
                controlKey='resumeUrl'
              />
            </FormInputs>
          </InputsArea>
          <ValidatingFormSubmitButton className='fillParent' loading={loading}>
            Apply
          </ValidatingFormSubmitButton>
        </FormComponent>
      </Container>
    </ModalContainer>
  );
};

export default ApplyForJobModal;

const Container = styled.div`
  display: flex;
  margin-top: -32px;
`;

const InputsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputDescription = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.blackBlack2};

  & > div:last-of-type {
    color: ${({ theme }) => theme.palette.greyGrey2};
  }
`;

const FormInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  width: 100%;
  /* border: 1px solid red; */
  gap: 8px;
`;
