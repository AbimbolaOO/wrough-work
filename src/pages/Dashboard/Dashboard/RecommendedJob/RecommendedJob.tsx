import React from 'react';

import styled from '@emotion/styled';

import EmptyableCard from '../../../../components/Card/EmptyableCard';
import JobsCard from '../../../../components/Card/JobsCard';
import useGetAllJobs from '../../../../hooks/getData/useGetAllJobs';
import useGetUserId from '../../../../hooks/id/useGetUserId';

const RecommendedJob = () => {
  const { loading, allJobsData } = useGetAllJobs();

  const { userId } = useGetUserId();

  return (
    <EmptyableCard
      className='biggerPadding'
      label='Recommended Jobs '
      emptyViewNote='You currently don’t have any recommendation'
      isEmpty={loading}
    >
      <Container>
        {allJobsData
          .filter((job) => job.jobCreatorId !== userId)
          .slice(0, 4)
          .map((job, index) => (
            <JobsCard
              key={index}
              // imgSrc={data.}
              institutionName={job.institutionName}
              jobDescription={job.jobDescription.jobDescription}
              // link={data.link}
            />
          ))}
      </Container>
    </EmptyableCard>
  );
};

export default RecommendedJob;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  //mobile-specific styles
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
