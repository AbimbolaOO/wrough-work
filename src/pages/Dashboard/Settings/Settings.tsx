import React from 'react';

import styled from '@emotion/styled';

import {
  SegmentedView,
  SegmentedViewController,
  SegmentedViewData,
} from '../../../components/SegmentedView/SegmentedView';
import NotificationSettings from './NotificationSettings/NotificationSettings';
import PasswordSettings from './PasswordSettings/PasswordSettings';
import PrivacySettings from './PrivacySettings/PrivacySettings';
import ProfileSettings from './ProfileSettings/ProfileSettings';
import { setmentedControllerConfig } from './setmentedControllerConfig';

const Settings = () => {
  return (
    <Container className='default-margin'>
      <SegmentedView>
        <SegmentedViewController
          segmentedViewControllerTitle={setmentedControllerConfig}
        />
        <SegmentedViewData>
          <div>
            <ProfileSettings />
          </div>
          <div>
            <PasswordSettings />
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
  );
};

export default Settings;

const Container = styled.div`
  display: grid;
  background-color: white;
  gap: 1rem;
  padding: 2rem;
  border-radius: 0.75rem;

  //mobile-specific styles
  @media (max-width: 768px) {
    overflow: hidden;
    padding: 1rem;

    & > div {
      // border: 1px solid red;
      width: 100%;
      overflow: hidden;
    }
  }
`;
