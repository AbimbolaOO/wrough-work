import styled from '@emotion/styled';

import ValidatingFormSubmitButton from '../../../../../../components/Button/FormSubmitButton';
import { FormComponent } from '../../../../../../components/Form/FormComponent';
import {
  DateInputField,
  SelectField,
  TextAreaInputField,
  TextInputField,
} from '../../../../../../components/Form/FormField';
import useGetUserData from '../../../../../../hooks/getData/useGetUserData';
import usePutUserData from '../../../../../../hooks/putData/usePutUserData';
import {
  BasicInfoDataType,
  basicInfoInitialValues,
  BasicInfoSchema,
} from '../../../../../../models/settings/profileSettings/basicInformation.model';
import { formatPhoneNumber } from '../../../../../../utils/utils';
import {
  CountryList,
  Experience,
  OccupationList,
  StateList,
} from './BasicInformationData';

const BasicInformation = () => {
  const { userData, refetch } = useGetUserData();
  const { loading, putUserData } = usePutUserData();

  // Create a new schema by omitting certain fields from BasicInfoSchema
  const UpdatedBasicInfoSchema = BasicInfoSchema.omit([
    'verification',
    'experiences',
  ]);

  const handleSubmit = async (
    values: BasicInfoDataType,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      // Format the phone number before submitting the form
      const formattedPhone = formatPhoneNumber(values.phone);

      // Update the values object with the formatted phone number
      const updatedValues = { ...values, phone: formattedPhone };

      // Send updated values to the server
      await putUserData(updatedValues);
      refetch();
      resetForm();
    } catch (error) {
      console.error('Failed to update user data', error);
    }
  };

  return (
    <FormComponent
      initialValues={basicInfoInitialValues}
      schema={UpdatedBasicInfoSchema}
      onSubmit={handleSubmit}
      className='customFormLayout respondflex'
      data={userData}
    >
      <TextInputField
        label='First Name'
        name='firstName'
        type='text'
        placeholder={userData ? `${userData?.firstName}` : ''}
        read={true}
        className='read'
      />

      <TextInputField
        label='Last Name'
        name='lastName'
        type='text'
        placeholder={userData ? `${userData?.lastName}` : ''}
        read={true}
        className='read'
      />

      <SelectField
        label='Occupation'
        name='occupation'
        rpiSrc='/static/svg/downArrowIcon.svg'
      >
        <option
          disabled
          value=''
          className='select-with-disabled-selected-option'
        >
          {userData ? userData?.occupation : 'Select Occupation'}
        </option>
        {OccupationList.map((data, index) => (
          <option key={index} value={data}>
            {data}
          </option>
        ))}
      </SelectField>

      <DateInputField
        label='Date of birth'
        type='date'
        name='birthday'
        placeholder={
          userData?.birthday ? `${userData?.birthday}` : 'Date of birth'
        }
        // date={userData?.birthday ? `${userData?.birthday}` : "Date of birth"}
      />

      <TextInputField
        label='Phone number'
        name='phone'
        type='text'
        placeholder={userData?.phone ? `${userData?.phone}` : 'phone'}
      />

      <TextInputField
        label='Email Address'
        name='email'
        type='text'
        placeholder={userData ? `${userData?.email}` : ''}
        read={true}
        className='read'
      />

      <SelectField
        label='State'
        name='state'
        rpiSrc='/static/svg/downArrowIcon.svg'
      >
        <option
          disabled
          value=''
          className='select-with-disabled-selected-option'
        >
          {userData?.state ? `${userData?.state}` : 'Select State'}
        </option>
        {StateList.map((data, index) => (
          <option key={index}>{data.country}</option>
        ))}
      </SelectField>

      <SelectField
        label='Country'
        name='country'
        rpiSrc='/static/svg/downArrowIcon.svg'
      >
        <option
          disabled
          value=''
          className='select-with-disabled-selected-option'
        >
          {userData?.country ? `${userData?.country}` : 'Select Country'}
        </option>
        {CountryList.map((data, index) => (
          <option key={index}>{data.country}</option>
        ))}
      </SelectField>

      <SelectField label='Years of Experience' name='yearsOfExperience'>
        <option value='' disabled>
          {userData?.yearsOfExperience
            ? `${userData?.yearsOfExperience}`
            : 'Click here to select'}
        </option>
        {Experience.map((exp, index) => (
          <option key={index} value={exp}>
            {exp}
          </option>
        ))}
      </SelectField>

      <TextAreaInputField
        label='Bio'
        name='bio'
        type='text'
        placeholder={userData?.bio ? `${userData.bio}` : 'Bio'}
        className='spanTwo'
      />
      <div className='btncontain'>
        <ValidatingFormSubmitButton loading={loading} className='small'>
          Save
        </ValidatingFormSubmitButton>
        <Next disabled>Next</Next>
      </div>
    </FormComponent>
  );
};

const Next = styled.button`
  gap: 0px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.palette.greyGrey3};
  color: white;
  font-weight: 500;
  font-size: 14px;
  border: 1px solid transparent;
  cursor: pointer;
  width: fit-content;
  padding: 0.5rem 4rem;

  //mobile-specific styles
  @media (max-width: 768px) {
    display: none;
  }
`;

export default BasicInformation;
