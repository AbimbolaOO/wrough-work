import React from 'react';
import { useNavigate, useParams } from 'react-router';

import styled from '@emotion/styled';

import LeftTriangleIcon from '../../../components/Icons/LeftTriangleIcon';
import {
  SegmentedViewControllerViaQueryString,
  SegmentedViewDataViaQueryStrings,
  SegmentedViewViaQueryString,
} from '../../../components/SegmentedView/SegmentedViewViaQueryStrings';
import { DASHBOARD, MANAGE_POSTED_JOBS } from '../../../routes/routeConstants';
import Applicant from './Applicant/Applicant';
import Interview from './Interview/Interview';
import ManagePostJobHeader from './ManagePostJobHeader';
import Screening from './Screening/Screening';

const segmentedControllerConfig = {
  Applicants: 'Applicants',
  Screening: 'Screening',
  Interview: 'Interview',
};

const ManagePostJobApplicant = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();

  return (
    <Container>
      <NavigationArea
        onClick={() => navigate(`/${DASHBOARD}/${MANAGE_POSTED_JOBS}`)}
      >
        <LeftTriangleIcon />
        Back to Dashboard
      </NavigationArea>
      <ManagePostJobHeader
        title='Some title'
        institutionName='Some Institution'
        yearsOfExperience='4'
        pay={300000}
        payInterval='HOURLY'
      />
      <Shell>
        <SegmentedViewViaQueryString
          queryString='Applicants'
          tabName='applicationStage'
        >
          <SegmentedViewControllerViaQueryString
            className='hollow'
            segmentedViewControllerTitle={segmentedControllerConfig}
          />
          <SegmentedViewDataViaQueryStrings
            segmentedViewControllerTitle={segmentedControllerConfig}
          >
            {/* <div> */}
            <Applicant jobId={jobId ?? ''} />
            {/* </div>
            <div> */}
            <Screening jobId={jobId ?? ''} />
            {/* </div>
            <div> */}
            <Interview jobId={jobId ?? ''} />
            {/* </div> */}
          </SegmentedViewDataViaQueryStrings>
        </SegmentedViewViaQueryString>
      </Shell>
    </Container>
  );
};

export default ManagePostJobApplicant;

const Container = styled.div`
  margin-top: 32px;
  margin-bottom: 54px;
  padding: 32px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

const NavigationArea = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #2f80ed;
  font-weight: 500;
  cursor: pointer;
  width: fit-content;

  & > svg {
    transition: transform 0.3s ease-in-out;
    transform: translateX(0);
  }

  &:hover > svg {
    transform: translateX(-8px);
  }
`;

const Shell = styled.div`
  display: flex;
  width: 100%;
  /* grid-template-columns: repeat(3, 1fr); */
  flex-direction: column;
  padding-left: 8px;
  padding-right: 8px;
`;
