import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from '@emotion/styled';

import LeftTriangleIcon from '../../../components/Icons/LeftTriangleIcon';
import { DASHBOARD, MANAGE_POSTED_JOBS } from '../../../routes/routeConstants';
import ManagePostJobHeader from './ManagePostJobHeader';

const ManagePostJobApplicant = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <NavigationArea
        onClick={() => navigate(`/${DASHBOARD}/${MANAGE_POSTED_JOBS}`)}
      >
        <LeftTriangleIcon />
        Back to Dashboard
      </NavigationArea>
      <ManagePostJobHeader
        title='Some title'
        institutionName='Some Institution'
        yearsOfExperience='4'
        pay={300000}
        payInterval='HOURLY'
      />
      <div>Fuck itt</div>
    </Container>
  );
};

export default ManagePostJobApplicant;

const Container = styled.div`
  margin-top: 32px;
  margin-bottom: 54px;
  padding: 32px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const NavigationArea = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #2f80ed;
  font-weight: 500;
  cursor: pointer;
  width: fit-content;

  & > svg {
    transition: transform 0.3s ease-in-out;
    transform: translateX(0);
  }

  &:hover > svg {
    transform: translateX(-8px);
  }
`;
