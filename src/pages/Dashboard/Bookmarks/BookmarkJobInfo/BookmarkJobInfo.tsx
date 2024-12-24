import React, { useEffect } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import { PrimaryButton, SecondaryButton } from '../../../../components/Button';
import EmptyState from '../../../../components/Card/EmptyState';
import { Modal } from '../../../../components/Modals/Modal';
import ApplyForJobModal from '../../../../components/Modals/ModalsActions/ApplyForJobModal';
import ReportJobModal from '../../../../components/Modals/ModalsActions/ReportJobModal';
import ModalTriggerContainer from '../../../../components/Modals/ModalTriggerContainer';
import { ModalProvider } from '../../../../context/ModalContext';
import useGetSingleBookmarkedLocumJob from '../../../../hooks/dashboard/jobs/useGetSingleBookmarkedLocumJob';
import useQueryString from '../../../../hooks/ui-control/useQueryString';
import { useAppSelector } from '../../../../redux/store';
import BookmarkJobInfoBody from './BookmarkJobInfoBody';
import BookmarkJobInfoHead from './BookmarkJobInfoHead';

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

interface BookmarkJobInfoProps {}

const BookmarkJobInfo: React.FC<BookmarkJobInfoProps> = () => {
  const [queryParams, setQueryParams] = useQueryString();
  const { getSingleBookmarkedLocumJob, loading } =
    useGetSingleBookmarkedLocumJob();

  const { bookmarkJobData, jobId: existingJobId } = useAppSelector(
    (state) => state.locumSingleBookmarkJobs
  );

  const jobId = queryParams.get('jobId');

  useEffect(() => {
    if (existingJobId) {
      setQueryParams({ jobId: existingJobId });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (jobId && jobId !== existingJobId) {
      getSingleBookmarkedLocumJob(jobId);
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
          <BookmarkJobInfoHead
            // imgSrc={jobData || '/static/gif/happyAnimal.gif'}
            imgSrc={'/static/gif/happyAnimal.gif'}
            title={bookmarkJobData?.title ?? ''}
            institutionName={bookmarkJobData?.institutionName ?? ''}
            yearsOfExperience={`${
              bookmarkJobData?.yearsOfExperience ?? ''
            } years+`}
            location={bookmarkJobData?.location ?? ''}
            pay={bookmarkJobData?.pay ?? 0}
            payInterval={bookmarkJobData?.payInterval ?? ''}
            jobStartDate={bookmarkJobData?.jobStartDate ?? ''}
            jobEndDate={bookmarkJobData?.jobEndDate ?? ''}
            jobId={bookmarkJobData?.id ?? ''}
          />

          <BookmarkJobInfoBody
            jobDescription={bookmarkJobData?.jobDescription.jobDescription}
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
                <ReportJobModal
                  title={bookmarkJobData?.title ?? ''}
                  description={bookmarkJobData?.institutionName ?? ''}
                />
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

export default BookmarkJobInfo;

const StickyWrapper = styled.div`
  display: flex;
  position: sticky;
  top: 0px;
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
