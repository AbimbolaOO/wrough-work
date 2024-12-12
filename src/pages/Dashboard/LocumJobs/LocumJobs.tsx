import React, { useState } from 'react';

import styled from '@emotion/styled';

import PaginationControl from '../../../components/PaginationControl/PaginationControl';
import JobInfo, { SelectedJobsProps } from './JobInfo/JobInfo';
import JobSearchForm from './JobSearchForm/JobSearchForm';
import JobsList from './JobsList/JobsList';

const setJobPlaceHolder = {
  id: '',
  jobCreatorId: '',
  imgSrc: '',
  title: '',
  jobDescription: {},
  institutionName: '',
  yearsOfExperience: '',
  location: '',
  pay: 0,
  payInterval: '',
  jobStartDate: '',
  jobEndDate: '',
};

const LocumJobs = () => {
  const [selectedJob, setSelectedJob] =
    useState<SelectedJobsProps>(setJobPlaceHolder); // Manage selected job

  return (
    <Shell>
      <JobSearchForm />
      <Container>
        <JobViewArea>
          <JobsList setSelectedJob={setSelectedJob} />
          <JobInfo selectedJob={selectedJob} />
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

  /* DI */
  background-color: white;
  padding: 2rem;
  border-radius: 0.75rem;
`;

const JobViewArea = styled.div`
  display: grid;
  grid-template-columns: 316px 1fr;
  gap: 32px;
`;

const PaginationShell = styled.div`
  display: grid;
  place-content: center;
  grid-column: span 2;
`;
