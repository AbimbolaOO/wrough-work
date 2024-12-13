import React from 'react';

import styled from '@emotion/styled';

import {
  SegmentedViewControllerLite,
  SegmentedViewDataLite,
  SegmentedViewLite,
} from '../../../../components/SegmentedView/SegmentedViewLite';
import ActiveApplications from './ActiveApplications/ActiveApplications';
import AllApplications from './AllApplications/AllApplications';

export const applicationSegmentedControllerConfig = [
  { title: 'All Applications' },
  { title: 'Active Applications' },
];

const ApplicationSegment = () => {
  return (
    <Container>
      <SegmentedViewLite>
        <SegmentedViewControllerLite
          segmentedViewControllerTitle={applicationSegmentedControllerConfig}
          className='grey'
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
  background-color: white;
  gap: 1rem;
  padding: 2rem;
  border-radius: 0.75rem;
`;
