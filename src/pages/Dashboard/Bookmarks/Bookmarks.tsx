import React, { useState } from 'react';

import styled from '@emotion/styled';

import BackToJobListButton from '../../../components/BackToJobListButton/BackToJobListButton';
import PageBanner from '../../../components/Banner/PageBanner';
import PaginationControl from '../../../components/PaginationControl/PaginationControl';
import BookmarkJobInfo from './BookmarkJobInfo/BookmarkJobInfo';
import BookmarkLists from './BookmarkList/BookmarkLists';

const Bookmarks = () => {
  const [showMobileInfo, setShowMobileInfo] = useState<boolean>(false);
  return (
    <Container>
      <PageBanner
        label='Bookmarks'
        description='Welcome to your bookmark dashboard'
      />
      <BackToJobListButton
        showMobileInfo={showMobileInfo}
        setShowMobileInfo={setShowMobileInfo}
      />
      <BookmarkWrapper>
        <JobViewArea>
          <BookmarkLists
            showMobileInfo={showMobileInfo}
            setShowMobileInfo={setShowMobileInfo}
          />
          <BookmarkJobInfo showMobileInfo={showMobileInfo} />
        </JobViewArea>

        <PaginationShell>
          <PaginationControl
            endPage={10}
            changePage={() => {}}
            defaultNumOfPagination={5}
          />
        </PaginationShell>
      </BookmarkWrapper>
    </Container>
  );
};

export default Bookmarks;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const JobViewArea = styled.div`
  display: grid;
  grid-template-columns: 316px 1fr;
  gap: 32px;

  height: 80vh;
  overflow: auto;

  @media (max-width: 884px) {
    grid-template-columns: 1fr;
  }
`;

const BookmarkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  /* border: 1px solid red; */

  background-color: white;
  padding: 2rem;
  border-radius: 0.75rem;
  margin-bottom: 54px;
`;

const PaginationShell = styled.div`
  display: grid;
  place-content: center;
  grid-column: span 2;

  @media (max-width: 884px) {
    display: none;
  }
`;
