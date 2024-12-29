import clsx from 'clsx';
import React from 'react';

import styled from '@emotion/styled';

import ValidatingFormSubmitButton from '../../../../../../components/Button/FormSubmitButton';
import { CustomDatePicker } from '../../../../../../components/Form/CustomDatePicker';
import CustomFileUploader from '../../../../../../components/Form/CustomFileUploader';
import CustomSelectField from '../../../../../../components/Form/CustomSelectField';
import { FormComponent } from '../../../../../../components/Form/FormComponent';
import { TextInputField } from '../../../../../../components/Form/FormField';
import ThreeDotVertical from '../../../../../../components/Icons/ThreeDotVertical';
import useCreateExperience from '../../../../../../hooks/dashboard/settings/profilesetting/useCreateExperience';
import {
  ExperienceDataType,
  experienceInitialValues,
  ExperienceSchema,
} from '../../../../../../models/dashboard/settings/profileSettings/experience.model';
import { useAppSelector } from '../../../../../../redux/store';

interface ExperienceFormProps {
  setEditExperienceForm?: (...args: any) => void;
  editExperienceForm?: boolean;
  formIndex?: number;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({
  setEditExperienceForm,
  editExperienceForm,
  formIndex,
}) => {
  const { authData } = useAppSelector((state) => state.auth);
  const { createExperience, loading } = useCreateExperience();

  const handleSubmit = async (values: ExperienceDataType, actions: any) => {
    createExperience(values, () => {
      actions.resetForm({ values: experienceInitialValues });
      setEditExperienceForm && setEditExperienceForm(false);
    });
  };

  let experienceInitialValuesDynamic = experienceInitialValues;

  if (formIndex && formIndex >= 0) {
    experienceInitialValuesDynamic = authData?.experiences[formIndex]
      ? authData?.experiences[formIndex]
      : experienceInitialValues;
  }

  return (
    <FormComponent
      initialValues={experienceInitialValuesDynamic}
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

        <CustomDatePicker
          label='Year Of Qualification'
          name='yearOfQualification'
          id='yearOfQualification'
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
            <CustomDatePicker
              label=''
              name='startDate'
              id='startDate'
              placeholder='Start Date'
            />
            <Dash>&mdash;</Dash>
            <DotIcon>
              <ThreeDotVertical />
            </DotIcon>

            <CustomDatePicker
              label=''
              name='endDate'
              id='endDate'
              placeholder='End Date'
            />
          </DateRange>
        </DateRangeArea>
      </FieldGroups>

      <FieldGroups
        className={clsx('submit-btn', editExperienceForm ? '' : 'single')}
      >
        {editExperienceForm && (
          <CancelBtn
            onClick={() =>
              setEditExperienceForm && setEditExperienceForm(false)
            }
          >
            Cancel
          </CancelBtn>
        )}
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

  @media (max-width: 884px) {
    grid-template-columns: 1fr;
  }

  &.submit-btn {
    display: flex;
    justify-content: space-between;

    &.single > * {
      margin-left: auto;
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr 1fr;

      & > * {
        padding: 8px 32px;
        gap: 16px;
      }
    }
  }
`;

const DateRangeArea = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: column;
`;

const DateRange = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  place-content: center;
  gap: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const DotIcon = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: 480px) {
    display: none;
  }
`;

const Label = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.blackBlack2};
  white-space: nowrap;
`;

const Dash = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 14px;

  @media (max-width: 480px) {
    display: none;
  }
`;

const CancelBtn = styled.div`
  background: ${({ theme }) => theme.palette.mainBlue};
  color: white;
  cursor: pointer;
  width: fit-content;
  border-radius: 4px;
  display: flex;
  justify-self: flex-start;
  padding: 8px 48px;
  font-weight: 500;
  font-size: 14px;
`;
