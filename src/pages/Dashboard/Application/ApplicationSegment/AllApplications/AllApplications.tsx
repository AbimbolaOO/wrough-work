import React from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import EmptyApplicationCard from '../../../../../components/Card/EmptyApplicationCard';
import JobListCard from '../../../../../components/Card/JobListCard';
import useGetAllAppsForUser from '../../../../../hooks/getData/useGetAllAppsForUser';

const AllApplications = () => {
  const { userAppsData, loading } = useGetAllAppsForUser();

  return (
    <Container>
      {loading ? (
        <LoadContainer>
          <LoadingOutlined />
        </LoadContainer>
      ) : userAppsData.length ? (
        <>
          {userAppsData.map((data, index) => (
            <JobListCard
              className='activejobs'
              key={index}
              imgSrc={'/static/gif/happyAnimal.gif'} // TODO: Place a default image here
              institutionName={data.job ? data.job.institutionName : ''}
              jobDescription={
                data.job ? data.job.jobDescription.jobDescription : ''
              }
              yearsOfExperience={data.job ? data.job.yearsOfExperience : ''}
              pay={data.job ? data.job.pay : 0}
            />
          ))}
        </>
      ) : (
        <EmptyApplicationCard />
      )}
    </Container>
  );
};

export default AllApplications;

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
