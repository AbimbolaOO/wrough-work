import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import JobListCard from '../../../../components/Card/JobListCard';
import useGetLocumJobs from '../../../../hooks/dashboard/jobs/useGetLocumJobs';
import { useAppSelector } from '../../../../redux/store';

interface JobsListProps {}

const JobsList: React.FC<JobsListProps> = () => {
  const { getLocumJobs, loading } = useGetLocumJobs();
  const { jobData, page } = useAppSelector((state) => state.locumJobs);
  const { jobId: currentJobId } = useAppSelector(
    (state) => state.locumSingleJobs
  );
  const navigate = useNavigate();
  const location = useLocation();

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

  // useEffect(() => {
  //   console.log('jobId-->>', jobId);
  //   if (jobId) {
  //     addQueryParams({ jobId });
  //   }
  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    if (currentJobId !== jobId) {
      getLocumJobs();
    }
    // eslint-disable-next-line
  }, [page]);

  const handleJobClick = (jobId: string) => {
    // console.log('handleJobClick-->>', jobId);
    addQueryParams({ jobId });
  };

  return (
    <Container>
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
`;
