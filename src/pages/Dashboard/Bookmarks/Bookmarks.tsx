import React from 'react';

import styled from '@emotion/styled';

import PageBanner from '../../../components/Banner/PageBanner';
import BookMarkLists from './BookMarkLists/BookMarkLists';

const Bookmarks = () => {
  return (
    <Container>
      <PageBanner
        label='Bookmarks'
        description='Welcome to your bookmark dashboard'
      />
      <BookMarkLists />
    </Container>
  );
};

export default Bookmarks;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
