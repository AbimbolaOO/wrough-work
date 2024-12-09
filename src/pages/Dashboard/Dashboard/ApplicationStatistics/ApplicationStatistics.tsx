import React from 'react';

import styled from '@emotion/styled';

import StatsCard from '../../../../components/Card/StatsCard';

const ApplicationStatistics = () => {
  const statsData = [
    {
      title: 'Total Applications',
      data: 0,
    },
    {
      title: 'Active Applications',
      data: 0,
    },
    {
      title: 'Pending Applications',
      data: 0,
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

  //mobile-specific styles
  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }
`;

const Header = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.blackBlack3};
  &.firstCard {
    color: ${({ theme }) => theme.palette.mainBlue};
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    display: none;
  }
`;
