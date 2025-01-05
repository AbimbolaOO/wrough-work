import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import ValidatingFormSubmitButton from '../../../../../../components/Button/FormSubmitButton';
import { CustomDatePicker } from '../../../../../../components/Form/CustomDatePicker';
import CustomFileUploader from '../../../../../../components/Form/CustomFileUploader';
import { FormComponent } from '../../../../../../components/Form/FormComponent';
import { TextInputField } from '../../../../../../components/Form/FormField';
import useCreateVerification from '../../../../../../hooks/dashboard/settings/profilesetting/useCreateVerification';
import {
  VerificationDataType,
  verificationInitialValues,
  VerificationSchema,
} from '../../../../../../models/dashboard/settings/profileSettings/verification.model';
import { useAppSelector } from '../../../../../../redux/store';

interface VerificationFormProps {
  setEditVerification?: (...args: any) => void;
  editVerification?: boolean;
}

const VerificationForm: React.FC<VerificationFormProps> = ({
  setEditVerification,
  editVerification,
}) => {
  const { authData } = useAppSelector((state) => state.auth);

  const { loading, createVerification } = useCreateVerification();
  const [initialVerificationValue, setInitialVerificationValue] = useState(
    verificationInitialValues
  );

  useEffect(() => {
    if (editVerification && authData?.verification) {
      setInitialVerificationValue(authData.verification);
    } else {
      setInitialVerificationValue(verificationInitialValues);
    }

    // eslint-disable-next-line
  }, [editVerification]);

  const handleSubmit = async (values: VerificationDataType) => {
    createVerification(values);
  };

  if (!initialVerificationValue) {
    return (
      <div>
        <LoadingOutlined />
      </div>
    );
  }

  return (
    <FormComponent
      initialValues={initialVerificationValue}
      schema={VerificationSchema}
      onSubmit={handleSubmit}
    >
      <FieldGroups>
        <CustomDatePicker
          label='Year of current License'
          name='yearOfCurrentLicense'
          id='yearOfCurrentLicense'
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

      <FieldGroups
        className={clsx('submit-btn', editVerification ? '' : 'single')}
      >
        {editVerification && (
          <CancelBtn
            onClick={() => {
              setEditVerification && setEditVerification(false);
            }}
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

export default VerificationForm;

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
