import React, { useEffect } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import JobListCard from '../../../../components/Card/JobListCard';
import useGetLocumJobs from '../../../../hooks/dashboard/jobs/useGetLocumJobs';
import { useAppSelector } from '../../../../redux/store';

interface JobsListProps {
  setSelectedJob: (...arg: any) => void;
}

const JobsList: React.FC<JobsListProps> = ({ setSelectedJob }) => {
  const { getLocumJobs, loading } = useGetLocumJobs();
  const { jobData, page } = useAppSelector((state) => state.locumJobs);

  useEffect(() => {
    getLocumJobs();
    // eslint-disable-next-line
  }, [page]);

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
            jobDescription={jobs.jobDescription.jobDescription}
            yearsOfExperience={jobs.yearsOfExperience}
            pay={jobs.pay}
            onClick={() => setSelectedJob({ ...jobs })}
            className='cursor-pointer'
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
