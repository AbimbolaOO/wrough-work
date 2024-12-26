import React from 'react';

import styled from '@emotion/styled';

import { FormSubmitButton } from '../../../../components/Button/FormSubmitButton';
import { FormComponent } from '../../../../components/Form/FormComponent';
import { Checkbox } from '../../../../components/Form/FormField';
import CautionIcon from '../../../../components/Icons/CautionIcon';
import {
  NotificationSettingsDataType,
  NotificationSettingsSchema,
} from '../../../../models/notificationSettings/notificationSettings.model';

const NotificationSettings = () => {
  const onSubmit = (value: NotificationSettingsDataType) => {
    console.log('I also got the mail', value);
  };

  return (
    <Container>
      <div>
        Spam is something that everyone despises. The kind that is sent by
        email. We do need to make sure you get the vital information, and you
        might enjoy the cool information as well.
      </div>
      <BlueText>
        Don't worry, you'll be able to go back and make changes later
      </BlueText>

      <FormComponent
        initialValues={NotificationSettings}
        schema={NotificationSettingsSchema}
        onSubmit={onSubmit}
        className={'gap2'}
      >
        <SectionSegment className='spanTwo'>
          <div>
            <BoldHead>
              How Should we notify you about your account activity?
            </BoldHead>
            <CautionLabel>
              <CautionIcon /> Not to worry, you can edit this later
            </CautionLabel>
          </div>
          <CheckBoxArea>
            <Checkbox name='email' className='small-sc'>
              Email
            </Checkbox>
            <Checkbox name='pushNotification' className='small-sc'>
              Push notification{' '}
            </Checkbox>
          </CheckBoxArea>
        </SectionSegment>

        <SectionSegment className='spanTwo'>
          <div>
            <BoldHead>
              How Should we notify you about your account activity?
            </BoldHead>
            <CautionLabel>
              <CautionIcon /> Not to worry, you can edit this later
            </CautionLabel>
          </div>
          <CheckBoxArea>
            <Checkbox name='telNotification' className='small-sc'>
              Yes, please do
            </Checkbox>
          </CheckBoxArea>
        </SectionSegment>

        <FormSubmitButton type='submit' className='notification'>
          Update Settings
        </FormSubmitButton>
      </FormComponent>
    </Container>
  );
};

export default NotificationSettings;

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.borderColor};
  border-radius: 0.375rem;
  padding: 2rem;
  display: grid;
  gap: 2rem;

  color: ${({ theme }) => theme.palette.blackBlack2};
  font-size: 1.125rem;

  @media (max-width: 480px) {
    padding: 1rem;
    font-size: 14px;
  }
`;

const BlueText = styled.div`
  color: ${({ theme }) => theme.palette.mainBlue};
  font-weight: 400;
`;

const SectionSegment = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

const BoldHead = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.palette.blackBlack2};
`;

const CautionLabel = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.greyGrey2};
`;

const CheckBoxArea = styled.div`
  display: flex;
  gap: 2.62rem;
`;
