import React from 'react';

import styled from '@emotion/styled';

import {
  SegmentedView,
  SegmentedViewController,
  SegmentedViewData,
} from '../../../components/SegmentedView/SegmentedView';
import NotificationSettings from './NotificationSettings/NotificationSettings';
import PrivacySettings from './PrivacySettings/PrivacySettings';
import ProfileSettings from './ProfileSettings/ProfileSettings';

const segmentedControllerConfig = [
  { title: 'Profile' },
  // { title: 'Password' },
  { title: 'Notification' },
  { title: 'Privacy' },
];

const Settings = () => {
  return (
    <Wrapper>
      <SettingsBanner>
        <div className='label'>Settings</div>
        <div className='description'>
          Welcome to your application Dashboards
        </div>
      </SettingsBanner>
      <Container>
        <SegmentedView>
          <SegmentedViewController
            segmentedViewControllerTitle={segmentedControllerConfig}
          />
          <SegmentedViewData>
            <div>
              <ProfileSettings />
            </div>
            {/* <div>
            <PasswordSettings />
          </div> */}
            <div>
              <NotificationSettings />
            </div>
            <div>
              <PrivacySettings />
            </div>
          </SegmentedViewData>
        </SegmentedView>
      </Container>
    </Wrapper>
  );
};

export default Settings;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Container = styled.div`
  display: grid;
  background-color: white;
  gap: 1rem;
  padding: 32px;
  border-radius: 0.75rem;
  margin-bottom: 54px;
`;

const SettingsBanner = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-left: -54px;
  margin-right: -54px;
  padding: 18px 54px;

  & > .label {
    color: ${({ theme }) => theme.palette.blackBlackMain};
    font-weight: 600;
    font-size: 24px;
    line-height: 35.88px;
  }

  & > .description {
    color: ${({ theme }) => theme.palette.greyGrey1};
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
  }
`;
