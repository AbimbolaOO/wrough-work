import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from '@emotion/styled';

import BackToJobListButton from '../../../components/BackToJobListButton/BackToJobListButton';
import PageBanner from '../../../components/Banner/PageBanner';
import PaginationControl from '../../../components/PaginationControl/PaginationControl';
import { BOOKMARKS } from '../../../routes/routeConstants';
import JobInfo from './JobInfo/JobInfo';
import JobSearchForm from './JobSearchForm/JobSearchForm';
import JobsList from './JobsList/JobsList';

const LocumJobs = () => {
  const navigate = useNavigate();
  const [showMobileInfo, setShowMobileInfo] = useState<boolean>(false);

  return (
    <Shell>
      <PageBanner
        label='Job Feeds'
        description='Here are your job feeds'
        className={`onlyMobileScreens ${showMobileInfo ? 'hide' : ''}`}
      />
      <JobSearchForm showMobileInfo={showMobileInfo} />
      <NavArea>
        <BackToJobListButton
          showMobileInfo={showMobileInfo}
          setShowMobileInfo={setShowMobileInfo}
        />
        <GoToBookmark onClick={() => navigate(`/${BOOKMARKS}`)}>
          Go to Bookmarks
        </GoToBookmark>
      </NavArea>
      <Container>
        <JobViewArea>
          <JobsList
            showMobileInfo={showMobileInfo}
            setShowMobileInfo={setShowMobileInfo}
          />
          <JobInfo showMobileInfo={showMobileInfo} />
        </JobViewArea>

        <PaginationShell>
          <PaginationControl
            endPage={10}
            changePage={() => {}}
            defaultNumOfPagination={5}
          />
        </PaginationShell>
      </Container>
    </Shell>
  );
};

export default LocumJobs;

const Shell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* margin-top: 32px; */
  margin-bottom: 54px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  background-color: white;
  padding: 2rem;
  border-radius: 0.75rem;

  @media (max-width: 540px) {
    /* border: 1px solid yellow; */
    padding: 20px;
    border-radius: 0;
    background-color: white;
    margin-left: -20px;
    margin-right: -20px;
  }
`;

const JobViewArea = styled.div`
  display: grid;
  grid-template-columns: 316px 1fr;
  gap: 32px;
  height: fit-content;

  @media (max-width: 884px) {
    grid-template-columns: 1fr;
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

const NavArea = styled.div`
  display: flex;
  margin-top: 20px;
`;

const GoToBookmark = styled.div`
  /* border: 1px solid red; */
  margin-left: auto;
  font-weight: 500;
  font-size: 18px;
  font-weight: 500;
  color: #2f80ed;
  cursor: pointer;

  @media (min-width: 885px) {
    display: none;
  }
`;
