import React, { useState } from 'react';

import styled from '@emotion/styled';

import ChevronLeftIcon from '../../../components/Icons/ChevronLeftIcon';
import JobInfo from './JobInfo/JobInfo';
import JobSearch from './JobsList/JobSearch';
import JobsList from './JobsList/JobsList';

const LocumJobs = () => {
  const [selectedJob, setSelectedJob] = useState(null); // Manage selected job
  const [isMobileVisible, setIsMobileVisible] = useState(false);

  const handleBack = () => {
    setIsMobileVisible(false);
  };

  return (
    <Container>
      {isMobileVisible ? (
        <Back onClick={handleBack}>
          <ChevronLeftIcon />
          <p>Back</p>
        </Back>
      ) : (
        <JobSearch />
      )}
      <JobViewArea>
        <JobsList
          isMobileView={isMobileVisible}
          setSelectedJob={setSelectedJob}
          setIsMobileVisible={setIsMobileVisible}
        />
        <JobInfo selectedJob={selectedJob} isMobileVisible={isMobileVisible} />
      </JobViewArea>
    </Container>
  );
};

export default LocumJobs;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const JobViewArea = styled.div`
  display: grid;
  grid-template-columns: 316px auto;
  background-color: white;
  gap: 2rem;
  padding: 2rem;
  border-radius: 0.75rem;

  //mobile-specific styles
  @media (max-width: 768px) {
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    margin-top: 2rem;
    padding: 0;
    background-color: ${({ theme }) => theme.palette.backgroundColor};
  }
`;

const Back = styled.div`
  display: none;

  //mobile-specific styles
  @media (max-width: 768px) {
    position: absolute;
    display: flex;
    justify-content: start;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 20.93px;
    letter-spacing: -0.05em;
    width: 100%;
    padding-left: 1.5rem;
  }
`;
