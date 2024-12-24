import React from 'react';

import styled from '@emotion/styled';

import PageBanner from '../../../components/Banner/PageBanner';
import PaginationControl from '../../../components/PaginationControl/PaginationControl';
import BookmarkJobInfo from './BookmarkJobInfo/BookmarkJobInfo';
import BookmarkLists from './BookmarkLists/BookmarkLists';

const Bookmarks = () => {
  return (
    <Container>
      <PageBanner
        label='Bookmarks'
        description='Welcome to your bookmark dashboard'
      />
      <BookmarkWrapper>
        <JobViewArea>
          <BookmarkLists />
          <BookmarkJobInfo />
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

  /* border: 1px solid blue; */
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
`;
