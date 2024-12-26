import { useEffect } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import EmptyApplicationCard from '../../../../../components/Card/EmptyApplicationCard';
import JobListCard from '../../../../../components/Card/JobListCard';
import useGetJobApplications from '../../../../../hooks/dashboard/jobs/useGetJobApplications';
import { useAppSelector } from '../../../../../redux/store';

const AllApplications = () => {
  const { getJobApplications, loading } = useGetJobApplications();
  const { jobData, page } = useAppSelector((state) => state.jobApplications);

  useEffect(() => {
    // console.log('jobData--><>>', jobData);
    //! Comeback here and look at this implementation
    if (!jobData.length) {
      getJobApplications();
    }

    // eslint-disable-next-line
  }, [page]);

  return (
    <Wrapper>
      {loading ? (
        <LoadContainer>
          <LoadingOutlined />
        </LoadContainer>
      ) : jobData.length ? (
        <Container>
          {jobData.map((job, index) => (
            <JobListCard
              key={index}
              imgSrc={'/static/gif/happyAnimal.gif'} // TODO: Place a default image here
              institutionName={job?.institutionName}
              jobTitle={job.title}
              yearsOfExperience={job.yearsOfExperience}
              pay={job.pay}
              jobId={job.id}
            />
          ))}
        </Container>
      ) : (
        <EmptyApplicationCard />
      )}
    </Wrapper>
  );
};

export default AllApplications;

const Wrapper = styled.div`
  display: flex;
  min-height: 65vh;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  overflow: auto;
  width: 100%;
  height: fit-content;

  @media (max-width: 884px) {
    grid-template-columns: 1fr;
  }
`;

const LoadContainer = styled.div`
  height: 14rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
