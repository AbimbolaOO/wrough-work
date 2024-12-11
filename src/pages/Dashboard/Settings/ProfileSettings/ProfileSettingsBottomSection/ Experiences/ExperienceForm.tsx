import React from 'react';

import styled from '@emotion/styled';

import ValidatingFormSubmitButton from '../../../../../../components/Button/FormSubmitButton';
import CustomFileUploader from '../../../../../../components/Form/CustomFileUploader';
import CustomSelectField from '../../../../../../components/Form/CustomSelectField';
import { FormComponent } from '../../../../../../components/Form/FormComponent';
import { TextInputField } from '../../../../../../components/Form/FormField';
import useCreateExperience from '../../../../../../hooks/dashboard/settings/profilesetting/useCreateExperience';
import {
  ExperienceDataType,
  experienceInitialValues,
  ExperienceSchema,
} from '../../../../../../models/dashboard/settings/profileSettings/experience.model';

const ExperienceForm = () => {
  const { createExperience, loading } = useCreateExperience();

  const handleSubmit = async (values: ExperienceDataType) => {
    createExperience(values);
  };
  return (
    <FormComponent
      initialValues={experienceInitialValues}
      schema={ExperienceSchema}
      onSubmit={handleSubmit}
    >
      <FieldGroups>
        <TextInputField label='Title' name='title' type='text' />

        <TextInputField
          label='Other Qualification'
          name='otherQualification'
          type='text'
          placeholder='Enter qualification name'
        />
      </FieldGroups>

      <FieldGroups>
        <TextInputField label='Company Name' name='companyName' type='text' />
        <CustomFileUploader
          label='Qualification Certificate'
          name='qualificationCertificate'
        />
      </FieldGroups>

      <FieldGroups>
        <CustomSelectField
          label='Employment Type'
          name='employmentType'
          id='occupation'
          optionData={['Full Time', 'Part Time', 'Contract']}
          placeholder='Click here to select'
        />

        <TextInputField
          label='Year Of Qualification'
          name='yearOfQualification'
          type='date'
          placeholder='Year Of Qualification'
        />
      </FieldGroups>

      <FieldGroups>
        <TextInputField
          label='Location'
          name='location'
          type='text'
          placeholder='Ikeja, Lagos'
        />

        <DateRangeArea>
          <Label>Period of employment</Label>
          <DateRange>
            <TextInputField name='startDate' type='date' />
            <Dash>&mdash;</Dash>
            <TextInputField name='endDate' type='date' label='' />
          </DateRange>
        </DateRangeArea>
      </FieldGroups>

      <FieldGroups className='submit-btn'>
        <ValidatingFormSubmitButton loading={loading} className='small'>
          Save
        </ValidatingFormSubmitButton>
      </FieldGroups>
    </FormComponent>
  );
};

export default ExperienceForm;

const FieldGroups = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  &.submit-btn {
    display: flex;

    & > * {
      margin-left: auto;
    }
  }
`;

const DateRange = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  place-content: center;
  gap: 16px;
`;

const DateRangeArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.blackBlack2};
  white-space: nowrap;
`;

const Dash = styled.div`
  display: flex;
  align-items: center;
`;
