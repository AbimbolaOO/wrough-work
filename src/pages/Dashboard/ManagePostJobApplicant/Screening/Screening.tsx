import React, { useEffect } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import ApplicantCard from '../../../../components/Card/ApplicantCard';
import useGetJobApplicantsForScreening from '../../../../hooks/dashboard/jobs/useGetJobApplicantsForScreening';
import { IApplicantData } from '../../../../models/dashboard/jobs/singleJobApplicants.model';

interface ScreeningProps {
  jobId: string;
}

const Screening: React.FC<ScreeningProps> = ({ jobId }) => {
  const { getSingleJobApplicantForScreening, loading, applicantData } =
    useGetJobApplicantsForScreening();

  useEffect(() => {
    getSingleJobApplicantForScreening(jobId);
    // eslint-disable-next-line
  }, []);

  if (!loading && !applicantData?.length) {
    return <Container>No applicant to screen</Container>;
  }

  return (
    <Container>
      {loading ? (
        <LoadingOutlined />
      ) : (
        applicantData?.map((data: IApplicantData, index: string) => (
          <ApplicantCard key={index} {...data} />
        ))
      )}
    </Container>
  );
};

export default Screening;

const Container = styled.div`
  /* border: 1px solid blue; */
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 884px) {
    grid-template-columns: 1fr;
  }
`;
