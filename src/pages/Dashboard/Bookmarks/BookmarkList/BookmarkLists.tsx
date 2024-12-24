import clsx from 'clsx';
import React, { useEffect } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import JobListCard from '../../../../components/Card/JobListCard';
import useGetBookmarkedLocumJobs from '../../../../hooks/dashboard/jobs/useGetBookmarkedLocumJobs';
import useQueryString from '../../../../hooks/ui-control/useQueryString';
import { useAppSelector } from '../../../../redux/store';

const BookmarkLists = () => {
  const { getBookmarkedLocumJobs, loading } = useGetBookmarkedLocumJobs();
  const [queryParams, setQueryParams] = useQueryString();
  const { bookmarkJobData } = useAppSelector(
    (state) => state.bookmarkedLocumJobs
  );

  const jobId = queryParams.get('jobId');

  useEffect(() => {
    if (bookmarkJobData.length === 0) {
      getBookmarkedLocumJobs();
    }
    // eslint-disable-next-line
  }, []);

  const handleJobClick = (jobId: string) => {
    // addQueryParams({ jobId });
    setQueryParams({ jobId });
  };

  return (
    <Container>
      {loading ? (
        <LoadingOutlined />
      ) : (
        bookmarkJobData.map((bookmark) => (
          <JobListCard
            key={bookmark.job.id}
            imgSrc={''} // TODO: place a default image here
            institutionName={bookmark.job?.institutionName}
            jobTitle={bookmark.job.title}
            yearsOfExperience={bookmark.job.yearsOfExperience}
            pay={bookmark.job.pay}
            // onClick={() => setSelectedJob({ ...bookmark.job })}
            onClick={(e: any) => handleJobClick(bookmark.job.id)}
            className={clsx(
              'cursor-pointer',
              bookmark.job.id === jobId ? 'active' : ''
            )}
            jobId={bookmark.job.id}
          />
        ))
      )}
    </Container>
  );
};

export default BookmarkLists;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
`;
