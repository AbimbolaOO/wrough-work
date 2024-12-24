import React from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import BookmarkBoxIcon from '../../components/Icons/BookmarkBoxIcon';
import useBookmarkJob from '../../hooks/dashboard/jobs/useBookmarkJob';

interface BookmarkJobProps {
  jobId: string;
}
const BookmarkJob: React.FC<BookmarkJobProps> = ({ jobId }) => {
  const { bookmarkJob, loading } = useBookmarkJob();
  const handleBookmarkJob = (e: any) => {
    e.stopPropagation();
    bookmarkJob(jobId);
  };
  return (
    <Container>
      {loading ? (
        <IconCell>
          <LoadingOutlined />
        </IconCell>
      ) : (
        <IconCell onClick={handleBookmarkJob}>
          <BookmarkBoxIcon />
        </IconCell>
      )}
    </Container>
  );
};

export default BookmarkJob;

const Container = styled.div`
  display: flex;
  cursor: pointer;
`;

const IconCell = styled.div`
  display: grid;
  place-content: center;
  width: 32px;
  height: 32px;
`;
