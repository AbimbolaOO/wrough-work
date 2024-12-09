import React from 'react';

import styled from '@emotion/styled';

import {
  SegmentedViewControllerLite,
  SegmentedViewDataLite,
  SegmentedViewLite,
} from '../../../../components/SegmentedView/SegmentedViewLite';
import ActiveApplications from './ActiveApplications/ActiveApplications';
import AllApplications from './AllApplications/AllApplications';
import { applicationSetmentedControllerConfig } from './applicationSetmentedControllerConfig';

const ApplicationSegment = () => {
  return (
    <Container className='default-margin'>
      <SegmentedViewLite>
        <SegmentedViewControllerLite
          segmentedViewControllerTitle={applicationSetmentedControllerConfig}
        />
        <SegmentedViewDataLite>
          <div>
            <AllApplications />
          </div>
          <div>
            <ActiveApplications />
          </div>
        </SegmentedViewDataLite>
      </SegmentedViewLite>
    </Container>
  );
};

export default ApplicationSegment;

const Container = styled.div`
  display: grid;
  background-color: white;
  gap: 1rem;
  padding: 2rem;
  border-radius: 0.75rem;

  //mobile-specific styles
  @media (max-width: 768px) {
    overflow-x: hidden;
    padding: 1rem;
  }
`;
