import React from 'react';

import styled from '@emotion/styled';

import ExperienceCardCell from '../../../../../../components/Card/ExperienceCardCell';
import { useAppSelector } from '../../../../../../redux/store';

interface ExperienceCardProps {
  setEditExperienceForm?: (...args: any) => void;
  setFormIndex: (...args: any) => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  setEditExperienceForm,
  setFormIndex,
}) => {
  const { authData } = useAppSelector((state) => state.auth);

  return (
    <Container>
      {authData?.experiences.map((data, index) => (
        <ExperienceCardCell
          key={index}
          index={index}
          title={data.title}
          companyName={data.companyName}
          employmentType={data.employmentType}
          location={data.location}
          startDate={data.startDate}
          endDate={data.endDate}
          setEditExperienceForm={setEditExperienceForm}
          setFormIndex={setFormIndex}
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

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
