import styled from '@emotion/styled';

import ValidatingFormSubmitButton from '../../../../../../components/Button/FormSubmitButton';
import { CustomDatePicker } from '../../../../../../components/Form/CustomDatePicker';
import CustomSelectField from '../../../../../../components/Form/CustomSelectField';
import { FormComponent } from '../../../../../../components/Form/FormComponent';
import {
  TextAreaInputField,
  TextInputField,
} from '../../../../../../components/Form/FormField';
import NaijaPhoneInputField from '../../../../../../components/Form/NaijaPhoneInputField';
import NumberOnlyInputField from '../../../../../../components/Form/NumberOnlyInputField';
import useUpdateBasicInformation from '../../../../../../hooks/dashboard/settings/profilesetting/useUpdateBasicInformation';
import {
  BasicInfoDataType,
  basicInfoInitialValues,
  BasicInfoSchema,
} from '../../../../../../models/dashboard/settings/profileSettings/basicInformation.model';
import { useAppSelector } from '../../../../../../redux/store';
import { formatPhoneNumber } from '../../../../../../utils/utils';
import { CountryList, OccupationList, StateList } from './BasicInformationData';

const BasicInformation = () => {
  const { updateBasicInfo, loading } = useUpdateBasicInformation();
  const { authData } = useAppSelector((state) => state.auth);

  const handleSubmit = (values: BasicInfoDataType) => {
    const formattedPhone = formatPhoneNumber(values.phone);
    const updatedValues = { ...values, phone: formattedPhone };
    updateBasicInfo(updatedValues);
  };

  let dynamicBasicInfoInitialValues = basicInfoInitialValues;
  if (authData?.isVerified) {
    dynamicBasicInfoInitialValues = {
      firstName: authData.firstName ?? '',
      lastName: authData.lastName ?? '',
      occupation: authData.occupation ?? '',
      birthday: authData.birthday ?? '',
      phone: authData.phone ?? '',
      email: authData.email ?? '',
      state: authData.state ?? '',
      country: authData.country ?? '',
      yearsOfExperience: String(authData?.yearsOfExperience ?? ''),
      bio: authData.bio ?? '',
    };
  }

  return (
    <FormComponent
      initialValues={dynamicBasicInfoInitialValues}
      schema={BasicInfoSchema}
      onSubmit={handleSubmit}
    >
      <FieldGroups>
        <TextInputField
          label='First Name'
          name='firstName'
          type='text'
          placeholder=''
          read={true}
          className='read'
        />

        <TextInputField
          label='Last Name'
          name='lastName'
          type='text'
          placeholder=''
          read={true}
          className='read'
        />
      </FieldGroups>

      <FieldGroups>
        <CustomSelectField
          label='Occupation'
          name='occupation'
          id='occupation'
          optionData={OccupationList}
        />

        <CustomDatePicker
          label='Date of birth'
          name='birthday'
          id='birthday'
          placeholder=''
        />
      </FieldGroups>

      <FieldGroups>
        <NaijaPhoneInputField label='Phone number' name='phone' type='text' />

        <TextInputField
          label='Email Address'
          name='email'
          type='text'
          placeholder=''
          read={true}
          className='read'
        />
      </FieldGroups>

      <FieldGroups className='three-col'>
        <NumberOnlyInputField
          label='Years of Experience'
          name='yearsOfExperience'
          type='text'
          placeholder=''
        />

        <CustomSelectField
          label='State'
          name='state'
          id='state'
          optionData={StateList.map(
            (data: Record<string, string>, index) => data.state
          )}
        />

        <CustomSelectField
          label='Country'
          name='country'
          id='country'
          optionData={CountryList.map(
            (data: Record<string, string>, index) => data.country
          )}
        />
      </FieldGroups>

      <TextAreaInputField
        label='Bio'
        name='bio'
        type='text'
        className='spanTwo'
      />

      <FieldGroups className='submit-btn'>
        <ValidatingFormSubmitButton loading={loading} className='small'>
          Save
        </ValidatingFormSubmitButton>
      </FieldGroups>
    </FormComponent>
  );
};

const FieldGroups = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  &.three-col {
    grid-template-columns: 1fr 1fr 1fr;
  }

  &.submit-btn {
    display: flex;

    & > * {
      margin-left: auto;
    }
  }

  @media (max-width: 884px) {
    &,
    &.three-col {
      grid-template-columns: 1fr;
    }
  }
`;

export default BasicInformation;
