import React, { useEffect } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import ApplicantCard from '../../../../components/Card/ApplicantCard';
import useGetSingleJobApplicants from '../../../../hooks/dashboard/jobs/useGetSingleJobApplicants';
import { IApplicantData } from '../../../../models/dashboard/jobs/singleJobApplicants.model';

interface ApplicantProps {
  jobId: string;
}
const Applicant: React.FC<ApplicantProps> = ({ jobId }) => {
  const { getSingleJobApplicant, loading, applicantData } =
    useGetSingleJobApplicants();

  useEffect(() => {
    getSingleJobApplicant(jobId);
    // eslint-disable-next-line
  }, []);

  if (!loading && !applicantData?.length) {
    return <Container>No applicant yet</Container>;
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

export default Applicant;

const Container = styled.div`
  /* border: 1px solid blue; */
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 884px) {
    grid-template-columns: 1fr;
  }
`;
