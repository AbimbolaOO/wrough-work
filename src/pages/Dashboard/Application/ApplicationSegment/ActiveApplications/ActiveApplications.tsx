import React from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import EmptyApplicationCard from '../../../../../components/Card/EmptyApplicationCard';
import JobListCard from '../../../../../components/Card/JobListCard';
import useGetAllAppsForUser from '../../../../../hooks/getData/useGetAllAppsForUser';
import { expired } from '../../../../../utils/utils';

const ActiveApplications = () => {
  const { userAppsData, loading } = useGetAllAppsForUser();

  return (
    <Container>
      {loading ? (
        <LoadContainer>
          <LoadingOutlined />
        </LoadContainer>
      ) : userAppsData.length ? (
        <>
          {userAppsData.map(
            (data, index) =>
              data.status === 'ACCEPTED' &&
              data.job &&
              !expired(data.job.expiryDate) ? (
                <JobListCard
                  className='activejobs'
                  key={index}
                  imgSrc={'/static/gif/happyAnimal.gif'} // TODO: Place a default image here
                  institutionName={data.job.institutionName || ''}
                  jobDescription={data.job.jobDescription.jobDescription || ''}
                  yearsOfExperience={data.job.yearsOfExperience || ''}
                  pay={data.job.pay || 0}
                />
              ) : null // Do not render if status is not "ACCEPTED" or job is expired
          )}
        </>
      ) : (
        <EmptyApplicationCard />
      )}
    </Container>
  );
};

export default ActiveApplications;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  height: 65vh;
  overflow: auto;

  //mobile-specific styles
  @media (max-width: 768px) {
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
    overflow-x: hidden;
  }
`;

const LoadContainer = styled.div`
  height: 14rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
