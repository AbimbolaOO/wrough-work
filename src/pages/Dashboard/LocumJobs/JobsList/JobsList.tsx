import clsx from 'clsx';
import React, { useEffect } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import JobListCard from '../../../../components/Card/JobListCard';
import useGetLocumJobs from '../../../../hooks/dashboard/jobs/useGetLocumJobs';
import useQueryString from '../../../../hooks/ui-control/useQueryString';
import { useAppSelector } from '../../../../redux/store';

interface JobsListProps {
  showMobileInfo?: boolean;
  setShowMobileInfo: (...args: any) => void;
}

const JobsList: React.FC<JobsListProps> = ({
  showMobileInfo,
  setShowMobileInfo,
}) => {
  const { getLocumJobs, loading } = useGetLocumJobs();
  const [queryParams, setQueryParams] = useQueryString();
  const { jobData } = useAppSelector((state) => state.locumJobs);

  const jobId = queryParams.get('jobId');

  useEffect(() => {
    if (jobData.length === 0) {
      getLocumJobs();
    }
    // eslint-disable-next-line
  }, []);

  const handleJobClick = (jobId: string) => {
    // addQueryParams({ jobId });
    setQueryParams({ jobId });
    setShowMobileInfo(!showMobileInfo);
  };

  return (
    <Container className={showMobileInfo ? 'showMobileInfo' : ''}>
      {loading ? (
        <LoadingOutlined />
      ) : (
        jobData.map((jobs) => (
          <JobListCard
            key={jobs.id}
            imgSrc={''} // TODO: place a default image here
            institutionName={jobs?.institutionName}
            jobTitle={jobs.title}
            yearsOfExperience={jobs.yearsOfExperience}
            pay={jobs.pay}
            // onClick={() => setSelectedJob({ ...jobs })}
            onClick={(e: any) => handleJobClick(jobs.id)}
            className={clsx(
              'cursor-pointer',
              jobs.id === jobId ? 'active' : ''
            )}
            jobId={jobs.id}
          />
        ))
      )}
    </Container>
  );
};

export default JobsList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;

  @media (max-width: 884px) {
    display: grid;
    /* border: 1px solid red; */

    &.showMobileInfo {
      display: none;
    }
  }
`;
