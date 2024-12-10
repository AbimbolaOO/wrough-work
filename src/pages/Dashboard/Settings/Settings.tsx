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
import { segmentedControllerConfig } from './segmentedControllerConfig';

const Settings = () => {
  return (
    <Container className='default-margin'>
      <SegmentedView>
        <SegmentedViewController
          segmentedViewControllerTitle={segmentedControllerConfig}
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
  padding: 32px;
  border-radius: 0.75rem;
  margin-top: 32px;
  margin-bottom: 54px;
`;
