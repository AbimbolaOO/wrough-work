import React from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import { PrimaryButton, SecondaryButton } from '../../../../components/Button';
import useGetUserData from '../../../../hooks/getData/useGetUserData';
import useApplyToJob from '../../../../hooks/postData/useApplyToJob';
import JobInfoBody from './JobInfoBody';
import JobInfoHead from './JobInfoHead';

interface JobInfoProps {
  selectedJob: {
    id: string;
    jobCreatorId?: string;
    imgSrc?: string;
    title: string;
    jobDescription: { jobDescription: '' };
    institutionName: string;
    yearsOfExperience: string;
    location: string;
    pay: number;
    payInterval: string;
    jobStartDate: Date;
    jobEndDate: Date;
  } | null;
  isMobileVisible: boolean;
}

const JobInfo: React.FC<JobInfoProps> = ({ selectedJob, isMobileVisible }) => {
  const { loading, applyToJob } = useApplyToJob();

  const { userData } = useGetUserData();

  // Render placeholder if no job is selected
  if (!selectedJob) {
    return <p>no jobs available</p>;
  }

  const handleApply = async () => {
    const formData = new FormData();

    if (userData?.email) {
      formData.append('email', userData?.email);
    }
    if (userData?.firstName) {
      formData.append('firstName', userData?.firstName);
    }
    if (userData?.lastName) {
      formData.append('lastName', userData?.lastName);
    }

    // Pass jobCreatorId when calling the hook to perform the check inside
    applyToJob(selectedJob.id, formData, selectedJob.jobCreatorId);
  };

  return (
    <Container isMobileVisible={isMobileVisible}>
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
      <JobInfoBody jobDescription={selectedJob.jobDescription.jobDescription} />
      <ButtonArea>
        <SecondaryButton click={handleApply} className='fw600 pl-pr-4 respond'>
          {loading ? <LoadingOutlined /> : 'Apply'}
        </SecondaryButton>
        <PrimaryButton className='fw600 danger respond'>Report</PrimaryButton>
      </ButtonArea>
    </Container>
  );
};

export default JobInfo;

interface ContainerProps {
  isMobileVisible: boolean;
}

const Container = styled.div<ContainerProps>`
  border: 1px solid ${({ theme }) => theme.palette.borderColor};
  border-radius: 0.375rem;
  padding: 2rem;
  display: grid;
  gap: 2rem;
  height: fit-content;
  background-color: ${({ theme }) => theme.palette.white};
  transition: top 0.3s ease-in-out, opacity 0.3s ease-in-out;

  //mobile-specific styles
  @media (max-width: 768px) {
    border: none;
    border-radius: 0;
    position: absolute;
    top: ${({ isMobileVisible }) => (isMobileVisible ? '20%' : '-200%')};
    left: 0;
    opacity: ${({ isMobileVisible }) => (isMobileVisible ? '1' : '0')};
    margin-left: auto;
    margin-right: auto;
    height: calc(100vh - 20%);
    overflow: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }
`;

const ButtonArea = styled.div`
  display: flex;
  gap: 2rem;
  height: fit-content;

  //mobile-specific styles
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
