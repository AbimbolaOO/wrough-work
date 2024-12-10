import { useState } from 'react';

import styled from '@emotion/styled';

import ValidatingFormSubmitButton from '../../../components/Button/FormSubmitButton';
import { FormComponent } from '../../../components/Form/FormComponent';
import {
  DateInputField,
  SelectField,
  TextInputField,
} from '../../../components/Form/FormField';
import { FormikToggleCheckbox } from '../../../components/Form/FormikToggleCheckbox';
import usePatchSingleJob from '../../../hooks/patchData/usePatchSingleJob';
import usePostJob from '../../../hooks/postData/usePostJob';
import {
  JobPostingDataType,
  JobPostingDataTypeGet,
  jobPostingInitialValues,
  JobPostingSchemaPost,
} from '../../../models/jobPosting/jobPosting.model';
import { formatDate } from '../../../utils/utils';
import PostJobDescription from './OptionalHeaderContent/PostJobDescription';

interface PostJobFormProps {
  editData?: JobPostingDataTypeGet | null;
  onSuccess?: () => void;
}

const PostJobForm: React.FC<PostJobFormProps> = ({ editData, onSuccess }) => {
  const [isPublished, setIsPublished] = useState(
    editData?.isPublished || false
  );
  const { loading, postJob } = usePostJob();
  const { loading: patchLoading, patchJob } = usePatchSingleJob();

  // Extract jobId from editData if available
  const jobId = editData?.id;

  const handlePublish = () => {
    setIsPublished(!isPublished);
  };

  const handleSubmit = async (
    values: JobPostingDataType,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await postJob(values);
      resetForm();
      if (onSuccess) onSuccess(); // Call onSuccess after the job creation is successful
    } catch (error) {
      console.error('Job creation failed', error);
    }
  };

  const handleEditSubmit = async (
    values: JobPostingDataType,
    { resetForm }: { resetForm: () => void }
  ) => {
    if (jobId) {
      const filteredValues = {
        title: values.title,
        institutionName: values.institutionName,
        jobDescription: values.jobDescription,
        pay: values.pay,
        payInterval: values.payInterval,
        location: values.location,
        yearsOfExperience: values.yearsOfExperience,
        expiryDate: values.expiryDate,
        isPublished: values.isPublished,
        jobStartDate: values.jobStartDate,
        jobEndDate: values.jobEndDate,
      };

      try {
        await patchJob(jobId, filteredValues);
        resetForm();
        if (onSuccess) onSuccess(); // Call onSuccess after job update is successful
      } catch (error) {
        console.error('Job update failed', error);
      }
    } else {
      console.error('Job ID is missing');
    }
  };

  console.log(editData?.jobDescription);

  return (
    <ComponentContainer>
      <FormComponent
        initialValues={{
          ...jobPostingInitialValues,
          isPublished: editData?.isPublished || false, // Add this to ensure isPublished is part of Formik values
        }}
        schema={JobPostingSchemaPost} // Use JobPostingSchemaGet for fetching, JobPostingSchemaPost for editing/posting
        onSubmit={editData ? handleEditSubmit : handleSubmit}
        className={'flex jobform'}
        // data={
        //   editData && {
        //     ...editData,
        //     jobStartDate: formatDate(editData?.jobStartDate || ''),
        //     jobEndDate: formatDate(editData?.jobEndDate || ''),
        //     expiryDate: formatDate(editData?.expiryDate || ''),
        //     jobDescription:
        //       typeof editData?.jobDescription === 'object'
        //         ? editData?.jobDescription?.jobDescription || ''
        //         : editData?.jobDescription || '',
        //   }
        // }
      >
        <FieldGroup>
          <TextInputField label={'Job Title:'} name='title' type='text' />
          <TextInputField
            label={'Institution Name'}
            name='institutionName'
            type='text'
          />
        </FieldGroup>
        <FieldGroup className='small-gap'>
          <ExperienceInput
            label={'Years Of Experience'}
            name='yearsOfExperience'
            rpiSrc='/static/svg/downArrowIcon.svg'
          >
            <option value='' disabled></option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </ExperienceInput>
          <DoubleInput>
            <TextInputField label={'Salary'} name='pay' type='number' />
            <StyledSelect
              label={'pay interval'}
              name='payInterval'
              rpiSrc='/static/svg/downArrowIcon.svg'
            >
              <option value='' disabled>
                Per Hour
              </option>
              <option value='HOURLY'>Per Hour</option>
              <option value='DAILY'>Per Day</option>
              <option value='WEEKLY'>Per Week</option>
              <option value='MONTHLY'>Per Month</option>
            </StyledSelect>
          </DoubleInput>
          <Wide>
            <TextInputField
              label={'Job Location'}
              name='location'
              type='text'
            />
          </Wide>
        </FieldGroup>
        <FieldGroup>
          <StyledLabel>
            Job Description <br />
            <StyledPostJobDescription
              name='jobDescription'
              initialValue={editData?.jobDescription?.jobDescription || ''}
            />
          </StyledLabel>
        </FieldGroup>
        <FieldGroup className='last'>
          <p>
            <FormikToggleCheckbox
              name='isPublished'
              controller={handlePublish}
            ></FormikToggleCheckbox>
            <span>Publish</span>
          </p>
          <DateInputField
            className='jobdate'
            label={'Start Date'}
            name='jobStartDate'
            type='date'
            placeholder='e'
          ></DateInputField>
          <DateInputField
            className='jobdate'
            label={'End Date'}
            name='jobEndDate'
            type='date'
          ></DateInputField>
          <DateInputField
            className='jobdate'
            label={'Expiry Date'}
            name='expiryDate'
            type='date'
          ></DateInputField>
        </FieldGroup>
        <PostButton loading={loading || patchLoading}>Next</PostButton>
        {/* <button type="submit">Submit</button> */}
      </FormComponent>
    </ComponentContainer>
  );
};

const ComponentContainer = styled.div`
  //mobile-specific styles
  @media (max-width: 768px) {
    height: calc(100vh + 35%);
    overflow: hidden;
  }
`;

const FieldGroup = styled.div`
  position: relative;
  //   margin-bottom: 1rem;
  width: 100%;
  display: flex;
  gap: 64px;
  justify-content: center;
  align-items: center;
  &.small-gap {
    justify-content: between;
  }
  &.last {
    justify-content: start;
    align-items: start;
  }
  & > p {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
  & > span {
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;

    &.last {
      display: grid;
      grid-template-columns: repeat(2, 1fr); /* Two equal columns */
      grid-template-rows: auto; /* Allow as many rows as needed */
      gap: 1rem; /* Optional: space between items */
      width: 100%; /* Ensure it takes up full container width */
      padding: auto;

      & > p {
        justify-content: start;
        align-items: center;
      }
    }
  }
`;

const DoubleInput = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: fit-content;

  //mobile-specific styles
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ExperienceInput = styled(SelectField)`
  width: 158px;
`;

const Wide = styled.div`
  width: 355px;
`;

const StyledSelect = styled(SelectField)`
  // margin-top: 22px;
`;

const StyledLabel = styled.label`
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.blackBlack2};
  white-space: nowrap;
  width: 100%;
`;

const StyledPostJobDescription = styled(PostJobDescription)`
  width: 100%;
  height: 20rem;
  padding: 8px;
  border: 1px solid #bdbdbd;
  border-radius: 6px;
`;

const PostButton = styled(ValidatingFormSubmitButton)`
  width: 180px;
  height: 40px;
  top: 822px;
  left: 830px;
  padding: 8px;
  border-radius: 4px;
  position: absolute;
  top: 90%;
  left: 77%;

  //mobile-specific styles
  @media (max-width: 768px) {
    left: 0;
    right: 0;
    margin: auto;
    top: 140%;
    width: 90%;
    margin-bottom: 1rem;
  }
`;

export default PostJobForm;
