import React from 'react';

import styled from '@emotion/styled';

import usePostJob from '../../../hooks/postData/usePostJob';
import {
  JobPostingDataType,
  jobPostingInitialValues,
  JobPostingSchemaPost,
} from '../../../models/jobPosting/jobPosting.model';
import { CustomCheckbox } from '../../Form/CustomCheckBox';
import { FormComponent } from '../../Form/FormComponent';
import { TextAreaInputField, TextInputField } from '../../Form/FormField';
import ModalContainer from '../ModalContainer';

const PostJobModal = () => {
  const { loading, postJob } = usePostJob();
  const handleSubmit = (values: JobPostingDataType, actions: any) => {
    alert(JSON.stringify(values));
  };

  return (
    <ModalContainer>
      <FormComponent
        initialValues={jobPostingInitialValues}
        schema={JobPostingSchemaPost}
        onSubmit={handleSubmit}
      >
        <Row className='two-even'>
          <TextInputField
            label='Job Tittle'
            placeholder=''
            name='title'
            id='title'
            type='text'
          />
          <TextInputField
            label='Institution Name'
            placeholder=''
            name='institutionName'
            id='institutionName'
            type='text'
          />
        </Row>
        <Row className='three'>
          <TextInputField
            label='Years of Experience'
            placeholder=''
            name='yearsOfExperience'
            id='yearsOfExperience'
            type='text'
          />
          <TextInputField
            label='Salary'
            placeholder=''
            name='pay'
            id='pay'
            type='text'
          />
          <TextInputField
            label='Job Location'
            placeholder=''
            name='name'
            id='name'
            type='text'
          />
        </Row>
        <TextAreaInputField
          label='Job Description'
          placeholder=''
          name='name'
          id='name'
          type='text'
        />
        <Row className='four'>
          <CustomCheckbox name='isPublished' className='column'>
            Publish
          </CustomCheckbox>

          <TextInputField
            label='Start Date'
            placeholder=''
            name='jobStartDate'
            id='jobStartDate'
            type='date'
          />
          <TextInputField
            label='Stop Date'
            placeholder=''
            name='jobEndDate'
            id='jobEndDate'
            type='date'
          />
          <TextInputField
            label='Expiry Date'
            placeholder=''
            name='expiryDate'
            id='expiryDate'
            type='date'
          />
        </Row>
      </FormComponent>
    </ModalContainer>
  );
};

export default PostJobModal;

const Row = styled.div`
  display: grid;
  width: 100%;
  /* border: 1px solid red; */
  gap: 16px;

  &.two-even {
    grid-template-columns: 1fr 1fr;
    /* gap: 64px; */
  }

  &.three {
    grid-template-columns: 1fr 2fr 2fr;
    /* gap: 38px; */
  }
  &.four {
    grid-template-columns: 100px 1fr 1fr 1fr;
    /* gap: 16px; */
  }
`;
