import React from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import { PrimaryButton, SecondaryButton } from '../../../../components/Button';
import useApplyToJob from '../../../../hooks/postData/useApplyToJob';
import JobInfoBody from './JobInfoBody';
import JobInfoHead from './JobInfoHead';

export interface SelectedJobsProps {
  id: string;
  jobCreatorId: string;
  imgSrc: string;
  title: string;
  jobDescription: any;
  institutionName: string;
  yearsOfExperience: string;
  location: string;
  pay: number;
  payInterval: string;
  jobStartDate: string;
  jobEndDate: string;
}

interface JobInfoProps {
  selectedJob: SelectedJobsProps;
}

const JobInfo: React.FC<JobInfoProps> = ({ selectedJob }) => {
  const { loading } = useApplyToJob();

  if (!selectedJob) {
    return <p>no jobs available</p>;
  }

  return (
    <StickyWrapper>
      <Container>
        <JobInfoHead
          imgSrc={selectedJob.imgSrc || '/static/gif/happyAnimal.gif'} // Use job's imgSrc or default image
          title={selectedJob.title}
          institutionName={selectedJob.institutionName}
          yearsOfExperience={`${selectedJob.yearsOfExperience} years+`}
          location={selectedJob.location}
          pay={selectedJob.pay}
          payInterval={selectedJob.payInterval}
          jobStartDate={selectedJob.jobStartDate}
          jobEndDate={selectedJob.jobEndDate}
        />

        <JobInfoBody
          jobDescription={selectedJob.jobDescription.jobDescription}
        />

        <ButtonArea>
          <SecondaryButton
            click={() => alert('submit')}
            className='fw600 pl-pr-4 respond'
          >
            {loading ? <LoadingOutlined /> : 'Apply'}
          </SecondaryButton>
          <PrimaryButton className='fw600 danger respond'>Report</PrimaryButton>
        </ButtonArea>
      </Container>
    </StickyWrapper>
  );
};

export default JobInfo;

const StickyWrapper = styled.div`
  display: flex;
  position: sticky;
  top: 160px;
  height: 80vh;
  /* border: 1px solid red; */
  overflow: auto;
`;

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.borderColor};
  border-radius: 6px;
  padding: 32px;
  display: grid;
  gap: 16px;
  height: fit-content;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.white};
`;

const ButtonArea = styled.div`
  display: flex;
  gap: 2rem;
  height: fit-content;
`;
