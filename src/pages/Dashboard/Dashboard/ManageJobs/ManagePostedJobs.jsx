import React from 'react';
import styled from '@emotion/styled';
import LeftArrowButtonIcon from '../../../../components/Icons/LeftArrowButtonIcon';
import ManagePostedJobsCard from '../../../../components/Card/ManagePostedJobsCard';
import { JobsDummyData } from '../PostedJobsDummyData';
import { useNavigate } from 'react-router-dom';

export default function ManagePostedJobs() {
  const navigate = useNavigate();

  return (
    <Container className='default-margin'>
      <Back
        onClick={() => {
          navigate('/dashboard');
        }}
      >
        <LeftArrowButtonIcon /> <span>Back to Dashboard</span>
      </Back>
      <CardContainer>
        {JobsDummyData.map((job, index) => (
          <ManagePostedJobsCard
            key={index}
            {...job}
            viewall={() => {
              navigate('/viewallapps');
            }}
          />
        ))}
      </CardContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 2.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  background-color: white;
  border-radius: 10px;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 24px;
  padding-bottom: 24px;
`;

const Back = styled.div`
  font-size: 18px;
  font-weight: 500;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  color: #2f80ed;
`;

const CardContainer = styled.div`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
