import styled from '@emotion/styled';

import ValidatingFormSubmitButton from '../../../../../../components/Button/FormSubmitButton';
import CustomFileUploader from '../../../../../../components/Form/CustomFileUploader';
import { FormComponent } from '../../../../../../components/Form/FormComponent';
import { TextInputField } from '../../../../../../components/Form/FormField';
import useCreateVerification from '../../../../../../hooks/dashboard/settings/profilesetting/useCreateVerification';
import {
  VerificationDataType,
  verificationInitialValues,
  VerificationSchema,
} from '../../../../../../models/dashboard/settings/profileSettings/verification.model';

const VerificationForm = () => {
  const { loading, createVerification } = useCreateVerification();

  const handleSubmit = async (values: VerificationDataType) => {
    createVerification(values);
  };

  return (
    <FormComponent
      initialValues={verificationInitialValues}
      schema={VerificationSchema}
      onSubmit={handleSubmit}
    >
      <FieldGroups>
        <TextInputField
          label='Year of current License'
          name='yearOfCurrentLicense'
          type='date'
          placeholder='Year of current License'
        />

        <CustomFileUploader label='Upload License' name='license' />
      </FieldGroups>

      <FieldGroups>
        <TextInputField
          label='Primary Degree Obtained'
          name='primaryDegreeName'
          type='text'
          placeholder='Degree name'
        />

        <TextInputField
          label='Validation Number'
          name='validationNumber'
          type='text'
          placeholder='eg Remita RRR'
        />
      </FieldGroups>

      <FieldGroups>
        <CustomFileUploader
          label='Primary Degree Certificate'
          name='primaryDegreeCertificate'
        />

        <div></div>
      </FieldGroups>

      <FieldGroups className='submit-btn'>
        <ValidatingFormSubmitButton loading={loading} className='small'>
          Save
        </ValidatingFormSubmitButton>
      </FieldGroups>
    </FormComponent>
  );
};

export default VerificationForm;

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

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
