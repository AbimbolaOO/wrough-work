import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import { PrimaryButton, SecondaryButton } from '../../../../components/Button';
import EmptyState from '../../../../components/Card/EmptyState';
import { Modal } from '../../../../components/Modals/Modal';
import ApplyForJobModal from '../../../../components/Modals/ModalsActions/ApplyForJobModal';
import ReportJobModal from '../../../../components/Modals/ModalsActions/ReportJobModal';
import ModalTriggerContainer from '../../../../components/Modals/ModalTriggerContainer';
import { ModalProvider } from '../../../../context/ModalContext';
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
  const { jobData, jobId: existingJobId } = useAppSelector(
    (state) => state.locumSingleJobs
  );
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get('jobId');

  const addQueryParams = (params: Record<string, string>) => {
    const queryString = new URLSearchParams({
      ...Object.fromEntries(new URLSearchParams(location.search)),
      ...params,
    }).toString();

    navigate({
      pathname: location.pathname,
      search: queryString,
    });
  };

  useEffect(() => {
    if (existingJobId) {
      addQueryParams({ jobId: existingJobId });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (jobId) {
      getSingleLocumJob(jobId);
    }
    // eslint-disable-next-line
  }, [jobId]);

  if (jobId === null) {
    return <EmptyState>Click on job to preview</EmptyState>;
  }

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
            <ModalProvider>
              <ModalTriggerContainer>
                <SecondaryButton className='fw600 pl-pr-4 respond'>
                  {loading ? <LoadingOutlined /> : 'Apply'}
                </SecondaryButton>
              </ModalTriggerContainer>

              <Modal>
                <ApplyForJobModal jobId={jobId} />
              </Modal>
            </ModalProvider>

            <ModalProvider>
              <ModalTriggerContainer>
                <PrimaryButton className='fw600 danger respond'>
                  Report
                </PrimaryButton>
              </ModalTriggerContainer>

              <Modal>
                <ReportJobModal />
              </Modal>
            </ModalProvider>
          </ButtonArea>
        </Container>
      ) : (
        <>
          <div>
            <LoadingOutlined />
          </div>
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
  /* border: 1px solid red; */
`;
