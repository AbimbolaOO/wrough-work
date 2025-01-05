import React from 'react';

import styled from '@emotion/styled';

import StatsCard from '../../../../components/Card/StatsCard';
import { useAppSelector } from '../../../../redux/store';

const ApplicationStatistics = () => {
  const jobsApplicationStats = useAppSelector(
    (state) => state.jobsApplicationStats
  );

  const statsData = [
    {
      title: 'Total Applications',
      data:
        jobsApplicationStats.ACCEPTED +
        jobsApplicationStats.INTERVIEW +
        jobsApplicationStats.REJECTED +
        jobsApplicationStats.SCREENING +
        jobsApplicationStats.SUBMITTED,
    },
    {
      title: 'Active Applications',
      data: jobsApplicationStats.SCREENING,
    },
    {
      title: 'Pending Applications',
      data: jobsApplicationStats.SUBMITTED,
    },
  ];

  return (
    <Container>
      <Header>Application Statistics</Header>
      <StatsCard statsData={statsData} />
    </Container>
  );
};

export default ApplicationStatistics;

const Container = styled.div`
  border-radius: 0.625rem;
  background: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  /* border: 1px solid red; */

  @media (max-width: 884px) {
    width: calc(100vw - 40px);
    height: fit-content;
  }
`;

const Header = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.blackBlack3};

  &.firstCard {
    color: ${({ theme }) => theme.palette.mainBlue};
  }

  @media (max-width: 884px) {
    display: none;
  }
`;
