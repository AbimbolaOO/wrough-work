import React from 'react';

import styled from '@emotion/styled';

import PageBanner from '../../../components/Banner/PageBanner';
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
      <PageBanner
        label='Setting'
        description='Welcome to your settings dashboard'
      />
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
