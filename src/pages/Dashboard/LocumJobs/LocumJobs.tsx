import React, { useState } from 'react';

import styled from '@emotion/styled';

import BackToJobListButton from '../../../components/BackToJobListButton/BackToJobListButton';
import PaginationControl from '../../../components/PaginationControl/PaginationControl';
import JobInfo from './JobInfo/JobInfo';
import JobSearchForm from './JobSearchForm/JobSearchForm';
import JobsList from './JobsList/JobsList';

const LocumJobs = () => {
  const [showMobileInfo, setShowMobileInfo] = useState<boolean>(false);

  return (
    <Shell>
      <JobSearchForm />
      <BackToJobListButton
        showMobileInfo={showMobileInfo}
        setShowMobileInfo={setShowMobileInfo}
      />
      <Container>
        <JobViewArea>
          <JobsList
            showMobileInfo={showMobileInfo}
            setShowMobileInfo={setShowMobileInfo}
          />
          <JobInfo showMobileInfo={showMobileInfo} />
        </JobViewArea>

        <PaginationShell>
          <PaginationControl
            endPage={10}
            changePage={() => {}}
            defaultNumOfPagination={5}
          />
        </PaginationShell>
      </Container>
    </Shell>
  );
};

export default LocumJobs;

const Shell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 32px;
  margin-bottom: 54px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  background-color: white;
  padding: 2rem;
  border-radius: 0.75rem;

  @media (max-width: 540px) {
    /* border: 1px solid yellow; */
    padding: 20px;
    border-radius: 0;
    background-color: white;
    margin-left: -20px;
    margin-right: -20px;
  }
`;

const JobViewArea = styled.div`
  display: grid;
  grid-template-columns: 316px 1fr;
  gap: 32px;
  height: fit-content;

  @media (max-width: 884px) {
    grid-template-columns: 1fr;
  }
`;

const PaginationShell = styled.div`
  display: grid;
  place-content: center;
  grid-column: span 2;

  @media (max-width: 884px) {
    display: none;
  }
`;
