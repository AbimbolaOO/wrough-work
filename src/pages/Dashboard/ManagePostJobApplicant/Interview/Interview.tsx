import React, { useEffect } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import InterviewCard from '../../../../components/Card/InterviewCard';
import useGetJobInterviews from '../../../../hooks/dashboard/jobs/useGetJobInterviews';
import { IApplicantData } from '../../../../models/dashboard/jobs/singleJobApplicants.model';

interface InterviewProps {
  jobId: string;
}
const Interview: React.FC<InterviewProps> = ({ jobId }) => {
  const { getJobInterviews, loading, interviews } = useGetJobInterviews();

  useEffect(() => {
    getJobInterviews(jobId);
    // eslint-disable-next-line
  }, []);

  if (!loading && !interviews?.length) {
    return <Container>No available interview</Container>;
  }

  return (
    <Container>
      {loading ? (
        <LoadingOutlined />
      ) : (
        interviews?.map((data: IApplicantData, index: string) => (
          <InterviewCard key={index} {...data} />
        ))
      )}
    </Container>
  );
};

export default Interview;

const Container = styled.div`
  /* border: 1px solid blue; */
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 884px) {
    grid-template-columns: 1fr;
  }
`;
