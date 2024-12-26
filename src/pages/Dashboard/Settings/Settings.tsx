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
  { title: 'Profile Settings' },
  { title: 'Notification Settings' },
  { title: 'Privacy Settings' },
];

const segmentedControllerConfigShortText = [
  { title: 'Profile' },
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
            className='large-screen'
            segmentedViewControllerTitle={segmentedControllerConfig}
          />
          <SegmentedViewController
            className='small-screen'
            segmentedViewControllerTitle={segmentedControllerConfigShortText}
          />
          <SegmentedViewData>
            <div>
              <ProfileSettings />
            </div>
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
  /* border: 1px solid red; */
`;

const Container = styled.div`
  display: grid;
  background-color: white;
  gap: 1rem;
  padding: 32px;
  border-radius: 0.75rem;
  margin-bottom: 54px;

  /* border: 1px solid green; */

  @media (max-width: 884px) {
    padding: 16px;
    border-radius: 0;
  }
`;
