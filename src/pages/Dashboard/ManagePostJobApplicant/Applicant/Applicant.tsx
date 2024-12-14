import React from 'react';

import styled from '@emotion/styled';

import ApplicantCard from './ApplicantCard';

const Applicant = () => {
  return (
    <Container>
      {Array.from({ length: 4 }).map((data, index) => (
        <ApplicantCard />
      ))}
    </Container>
  );
};

export default Applicant;

const Container = styled.div`
  /* border: 1px solid blue; */
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(3, 1fr);
`;
