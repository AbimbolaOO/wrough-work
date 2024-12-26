import React from 'react';

import styled from '@emotion/styled';

import {
  SegmentedViewControllerLite,
  SegmentedViewDataLite,
  SegmentedViewLite,
} from '../../../../../components/SegmentedView/SegmentedViewLite';
import Experiences from './ Experiences/ Experiences';
import BasicInformation from './BasicInformation/BasicInformation';
import Verification from './Verification/Verification';

const segmentedControlConfData = [
  { title: 'Basic information ' },
  { title: 'Verification' },
  { title: ' Experiences' },
];

const ProfileSettingsBottomSection = () => {
  return (
    <Container>
      <SegmentedViewLite>
        <SegmentedViewControllerLite
          segmentedViewControllerTitle={segmentedControlConfData}
        />
        <SegmentedViewDataLite>
          <div>
            <BasicInformation />
          </div>
          <div>
            <Verification />
          </div>
          <div>
            <Experiences />
          </div>
        </SegmentedViewDataLite>
      </SegmentedViewLite>
    </Container>
  );
};

export default ProfileSettingsBottomSection;

const Container = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  padding: 1.25rem;

  @media (max-width: 884px) {
  }
`;
