import React from 'react';
import styled from '@emotion/styled';
import ManagePostedJobsCard from '../../../components/Card/ManagePostedJobsCard';
import { useAppSelector } from '../../../redux/store';
import PaginationControl from '../../../components/PaginationControl/PaginationControl';
import LeftTriangleIcon from '../../../components/Icons/LeftTriangleIcon';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD } from '../../../routes/routeConstants';

export default function ManagePostedJobs() {
  const navigate = useNavigate();
  const jobsCreatedList = useAppSelector((state) => state.jobsCreatedList);

  return (
    <Container>
      <NavigationArea onClick={() => navigate(`/${DASHBOARD}`)}>
        <LeftTriangleIcon />
        Back to Dashboard
      </NavigationArea>
      <Box>
        {jobsCreatedList?.map((data, index) => (
          <ManagePostedJobsCard key={index} job={data} />
        ))}
      </Box>
      <PaginationShell>
        <PaginationControl
          endPage={10}
          changePage={() => {}}
          defaultNumOfPagination={5}
        />
      </PaginationShell>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 32px;
  margin-bottom: 54px;
  padding: 32px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
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

const PaginationShell = styled.div`
  display: grid;
  place-content: center;
  grid-column: span 2;

  @media (max-width: 884px) {
    display: none;
  }
`;
