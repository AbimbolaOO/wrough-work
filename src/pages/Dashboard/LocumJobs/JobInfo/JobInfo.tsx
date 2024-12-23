import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import { PrimaryButton, SecondaryButton } from '../../../../components/Button';
import useGetSingleLocumJob from '../../../../hooks/dashboard/jobs/useGetSingleLocumJob';
import { useAppSelector } from '../../../../redux/store';
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

interface JobInfoProps {}

const JobInfo: React.FC<JobInfoProps> = () => {
  const location = useLocation();
  const { getSingleLocumJob, loading } = useGetSingleLocumJob();
  const { jobData } = useAppSelector((state) => state.locumSingleJobs);

  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get('jobId');

  useEffect(() => {
    if (jobId) {
      getSingleLocumJob(jobId);
    }
    // eslint-disable-next-line
  }, [jobId]);

  return (
    <StickyWrapper>
      {!loading ? (
        <Container>
          <JobInfoHead
            // imgSrc={jobData || '/static/gif/happyAnimal.gif'}
            imgSrc={'/static/gif/happyAnimal.gif'}
            title={jobData?.title ?? ''}
            institutionName={jobData?.institutionName ?? ''}
            yearsOfExperience={`${jobData?.yearsOfExperience ?? ''} years+`}
            location={jobData?.location ?? ''}
            pay={jobData?.pay ?? 0}
            payInterval={jobData?.payInterval ?? ''}
            jobStartDate={jobData?.jobStartDate ?? ''}
            jobEndDate={jobData?.jobEndDate ?? ''}
          />

          <JobInfoBody
            jobDescription={jobData?.jobDescription.jobDescription}
          />

          <ButtonArea>
            <SecondaryButton
              click={() => alert('submit')}
              className='fw600 pl-pr-4 respond'
            >
              {loading ? <LoadingOutlined /> : 'Apply'}
            </SecondaryButton>
            <PrimaryButton className='fw600 danger respond'>
              Report
            </PrimaryButton>
          </ButtonArea>
        </Container>
      ) : (
        <>
          <div>
            <LoadingOutlined />
          </div>
          {/* <EmptyState>Click on job to preview</EmptyState> */}
        </>
      )}
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
