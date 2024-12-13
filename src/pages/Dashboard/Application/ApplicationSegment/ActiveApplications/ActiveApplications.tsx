import { useEffect } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import EmptyApplicationCard from '../../../../../components/Card/EmptyApplicationCard';
import JobListCard from '../../../../../components/Card/JobListCard';
import useGetActiveJobApplications from '../../../../../hooks/dashboard/jobs/useGetActiveJobApplications';
import { useAppSelector } from '../../../../../redux/store';

const ActiveApplications = () => {
  const { getActiveJobApplications, loading } = useGetActiveJobApplications();
  const { jobData, page } = useAppSelector(
    (state) => state.activeJobApplications
  );

  useEffect(() => {
    //! Comeback here and look at this implementation
    if (!jobData.length) {
      getActiveJobApplications();
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
              className='activejobs'
              key={index}
              imgSrc={'/static/gif/happyAnimal.gif'} // TODO: Place a default image here
              institutionName={job?.institutionName}
              jobTitle={job.title}
              yearsOfExperience={job.yearsOfExperience}
              pay={job.pay}
            />
          ))}
        </Container>
      ) : (
        <EmptyApplicationCard />
      )}
    </Wrapper>
  );
};

export default ActiveApplications;

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
`;

const LoadContainer = styled.div`
  height: 14rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
