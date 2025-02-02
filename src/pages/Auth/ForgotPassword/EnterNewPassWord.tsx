import { NavLink } from 'react-router';

import styled from '@emotion/styled';

import Formtainer from '../../../components/Authlayout/Formtainer';
import ValidatingFormSubmitButton from '../../../components/Button/FormSubmitButton';
import { FormComponent } from '../../../components/Form/FormComponent';
import { PasswordInputField } from '../../../components/Form/FormField';
import {
  newPassWordDataType,
  newPasswordInitialValues,
  newPassWordSchema,
} from '../../../models/auth/enterNewPassword.model';
import { LOCUM_SIGNUP } from '../../../routes/routeConstants';

const EnterNewPassword = () => {
  const onSubmit = (value: newPassWordDataType) => {
    alert(value.password);
  };

  return (
    <Formtainer header='PASSWORD RESET'>
      <FormComponent
        initialValues={newPasswordInitialValues}
        schema={newPassWordSchema}
        onSubmit={onSubmit}
        className={'column'}
      >
        <FieldBox>
          <Label>Enter New PassWord</Label>
          <PasswordInputField
            label='Enter New Password'
            name='password'
            id='email'
            type='password'
            placeholder='password'
          />
        </FieldBox>
        <ValidatingFormSubmitButton className='fillParent'>
          Save New PassWord
        </ValidatingFormSubmitButton>
      </FormComponent>
      <StyledNav to={LOCUM_SIGNUP}>Back Home</StyledNav>
    </Formtainer>
  );
};

export default EnterNewPassword;

const FieldBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* outline: 2px solid red; */
  gap: 58px;
  margin-top: -20px;
  justify-content: center;
  /* width: fit-content; */
`;

const Label = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 20px;
  font-weight: 300;
  gap: 4px;
  color: ${({ theme }) => theme.palette.greyGrey1};
`;

const StyledNav = styled(NavLink)`
  color: ${({ theme }) => theme.palette.mainBlue};
  text-decoration: none;
  font-weight: 400;
`;
