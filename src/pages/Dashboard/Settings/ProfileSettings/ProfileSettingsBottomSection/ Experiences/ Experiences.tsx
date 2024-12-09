import { useState } from 'react';

import styled from '@emotion/styled';

import ValidatingFormSubmitButton from '../../../../../../components/Button/FormSubmitButton';
import { FormComponent } from '../../../../../../components/Form/FormComponent';
import {
  DateInputField,
  SelectField,
  TextInputField,
  UploadField,
} from '../../../../../../components/Form/FormField';
import useDeleteExperience from '../../../../../../hooks/deleteData/useDeleteExperience';
import useGetExperience from '../../../../../../hooks/getData/useGetExperience';
import useUserExperince from '../../../../../../hooks/postData/useUserExperience';
import usePutUserExperience from '../../../../../../hooks/putData/usePutUserExperience';
import {
  ExperienceDataType,
  experienceInitialValues,
  ExperienceSchema,
} from '../../../../../../models/settings/profileSettings/experience.model';
import SavedExpCard from './SavedExpCard';

const Experiences = () => {
  const { loading, sendExperience } = useUserExperince();

  const { userExperience, refetch } = useGetExperience();

  const { loading: editLoading, editExperience } = usePutUserExperience();

  const { deleteExperience } = useDeleteExperience();

  const [cards, setCards] = useState(false);

  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const handleSubmit = async (
    values: ExperienceDataType,
    { resetForm }: { resetForm: () => void }
  ) => {
    const formData = new FormData();

    // Append the text fields to the FormData
    formData.append('title', values.title);
    if (values.otherQualification) {
      formData.append('otherQualification', values.otherQualification);
    }
    formData.append('companyName', values.companyName);

    // Conditionally append employmentType if it's defined
    if (values.employmentType) {
      formData.append('employmentType', values.employmentType);
    }

    // Convert yearOfQualification to string
    if (values.yearOfQualification) {
      const yearOfQualification =
        values.yearOfQualification instanceof Date
          ? values.yearOfQualification.toISOString()
          : values.yearOfQualification;
      formData.append('yearOfQualification', yearOfQualification);
    }

    formData.append('location', values.location);

    formData.append('startDate', values.startDate);
    formData.append('endDate', values.endDate);

    // Append the file field to the FormData
    if (values.qualificationCertificate instanceof File) {
      formData.append(
        'qualificationCertificate',
        values.qualificationCertificate
      );
    }

    // Append the id if it exists
    if (values.id) {
      formData.append('id', values.id);
    }

    // Use the FormData object for sendExperience or editExperience function
    if (editing && values.id) {
      await editExperience(values?.id, formData);
    } else {
      await sendExperience(formData);
    }

    refetch(); // Call refetch to update the experience list

    // Reset the form
    resetForm();
    setCards(true);
  };

  const handleEdit = (id: string) => {
    const selectedExperience = userExperience.find(
      (experience) => experience.id === id
    );
    if (selectedExperience) {
      setEditing(true);
      setEditData(selectedExperience);
      setCards(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (id) {
      await deleteExperience(id); // Await deleteExperience call
      refetch();
    }
  };

  return (
    <Container>
      {!cards ? (
        <FormComponent
          initialValues={experienceInitialValues}
          schema={ExperienceSchema}
          onSubmit={handleSubmit}
          className='customFormLayout respondflex'
          data={editing && editData}
        >
          <TextInputField label='Title' name='title' type='text' />

          <TextInputField
            label='Other Qualification'
            name='otherQualification'
            type='text'
            placeholder='enter qualification name'
          />

          <TextInputField label='Company Name' name='companyName' type='text' />

          <UploadField
            label='Qualification Certificate'
            name='qualificationCertificate'
          />

          <SelectField
            label='Employment Type'
            name='employmentType'
            rpiSrc='/static/svg/downArrowIcon.svg'
          >
            <option
              disabled
              value=''
              className='select-with-disabled-selected-option'
            >
              {'click here to select'}
            </option>
            <option value='FullTime'>Full Time</option>
            <option value='PartTime'>Part Time</option>
            <option value='Contract'>Contract</option>
          </SelectField>

          <DateInputField
            label='Year Of Qualification'
            name='yearOfQualification'
            type='date'
            placeholder='Year Of Qualification'
          />

          <TextInputField
            label='Location'
            name='location'
            type='text'
            placeholder='Ikeja, Lagos'
          />
          <Period>
            <p>Period of employment</p>
            <div>
              <DateInputField
                className='in'
                name='startDate'
                type='date'
                placeholder='Start Date'
              />
              <DateInputField
                className='in'
                name='endDate'
                type='date'
                placeholder='End Date'
              />
            </div>
          </Period>
          <View
            onClick={() => {
              setCards(true);
              setEditing(false);
            }}
          >
            View saved Experience
          </View>
          <div className='btncontain'>
            <ValidatingFormSubmitButton
              loading={loading || editLoading}
              className='small'
            >
              Save
            </ValidatingFormSubmitButton>
            <Next>Next</Next>
          </div>
        </FormComponent>
      ) : (
        <CardContainer>
          {userExperience.map((experience, index) => (
            <SavedExpCard
              key={experience.id}
              title={experience.title}
              companyName={experience.companyName}
              employmentType={experience.employmentType}
              location={experience.location}
              yearOfQualification={experience.yearOfQualification}
              startDate={
                experience.startDate
                  ? new Date(experience.startDate).toLocaleDateString()
                  : 'N/A'
              }
              endDate={
                experience.endDate
                  ? new Date(experience.endDate).toLocaleDateString()
                  : 'N/A'
              }
              otherQualification={experience.otherQualification}
              qualificationCertificate={experience.qualificationCertificate}
              onEdit={async () => experience.id && handleEdit(experience.id)}
              onDelete={async () =>
                experience.id && handleDelete(experience.id)
              }
            />
          ))}
          <p
            onClick={() => {
              setCards(false);
              setEditing(false);
            }}
          >
            Add experience
          </p>
        </CardContainer>
      )}
    </Container>
  );
};

const Container = styled.div``;

const Next = styled.button`
  gap: 0px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.palette.greyGrey3};
  color: white;
  font-weight: 500;
  font-size: 0.875rem;
  color: white;
  border: 1px solid transparent;
  cursor: pointer;
  width: fit-content;
  padding: 0.5rem 4rem;

  //mobile-specific styles
  @media (max-width: 768px) {
    display: none;
  }
`;

const Period = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  & > p {
    font-size: 18px;
    font-weight: 400;
    line-height: 26.91px;
  }
  & > div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    // gap: 3rem;
    width: 100%;
    & .in {
      width: 65%;
    }
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    & > div {
      flex-direction: column;
      gap: 2rem;
      & .in {
        width: 100%;
      }
    }

    & > p {
      font-size: 16px;
    }
  }
`;

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  & > p {
    position: absolute;
    bottom: -50px;
    color: ${({ theme }) => theme.palette.mainBlue};
    font-size: 18px;
    font-weight: 500;
    line-height: 20px;
    cursor: pointer;
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    & > p {
      font-size: 14px;
    }
  }
`;

const View = styled.p`
  bottom: -50px;
  color: ${({ theme }) => theme.palette.mainBlue};
  font-size: 18px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;

  //mobile-specific styles
  @media (max-width: 768px) {
    width: 100%;
    font-size: 14px;
  }
`;

export default Experiences;
