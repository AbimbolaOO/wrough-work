import React, { useState } from 'react';

import styled from '@emotion/styled';

import PaginationControl from '../../../components/PaginationControl/PaginationControl';
import JobInfo from './JobInfo/JobInfo';
import JobSearchForm from './JobSearchForm/JobSearchForm';
import JobsList from './JobsList/JobsList';

const LocumJobs = () => {
  const [selectedJob, setSelectedJob] = useState(null); // Manage selected job
  const [isMobileVisible, setIsMobileVisible] = useState(false);

  return (
    <Container>
      <JobSearchForm />

      <JobViewArea>
        <JobsList setSelectedJob={setSelectedJob} />
        <JobInfo selectedJob={selectedJob} isMobileVisible={isMobileVisible} />

        <PaginationShell>
          <PaginationControl
            endPage={10}
            changePage={() => {}}
            defaultNumOfPagination={5}
          />
        </PaginationShell>
      </JobViewArea>
    </Container>
  );
};

export default LocumJobs;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 32px;
  margin-bottom: 54px;
`;

const JobViewArea = styled.div`
  display: grid;
  grid-template-columns: 316px 1fr;
  background-color: white;
  gap: 32px;
  padding: 2rem;
  border-radius: 0.75rem;
`;

const PaginationShell = styled.div`
  display: grid;
  place-content: center;
  grid-column: span 2;
`;
