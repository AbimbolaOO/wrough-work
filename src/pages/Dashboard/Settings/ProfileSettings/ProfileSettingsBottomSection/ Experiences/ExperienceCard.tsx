import React from 'react';

import styled from '@emotion/styled';

import ExperienceCardCell from '../../../../../../components/Card/ExperienceCardCell';
import { useAppSelector } from '../../../../../../redux/store';

const ExperienceCard = () => {
  const { authData } = useAppSelector((state) => state.auth);

  return (
    <Container>
      {authData?.experiences.map((data, index) => (
        <ExperienceCardCell
          key={index}
          title={data.title}
          companyName={data.companyName}
          employmentType={data.employmentType}
          location={data.location}
          startDate={data.startDate}
          endDate={data.endDate}
        />
      ))}
    </Container>
  );
};

export default ExperienceCard;

const Container = styled.div`
  display: grid;
  gap: 16px;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid ${({ theme }) => theme.palette.greyGrey3};
  padding: 24px 0;
`;
