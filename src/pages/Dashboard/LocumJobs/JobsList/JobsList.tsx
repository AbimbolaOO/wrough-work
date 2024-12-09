import React, { useEffect, useState } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import { DummyJobsList } from '../../../../__mock__/DummyJobsList';
import JobListCard from '../../../../components/Card/JobListCard';
import LeftArrowButtonIcon from '../../../../components/Icons/LeftArrowButtonIcon';
import RightArrowButtonIcon from '../../../../components/Icons/RightArrowButtonIcon';
import useGetAllJobs from '../../../../hooks/getData/useGetAllJobs';

interface JobsListProps {
  setSelectedJob: (job: any) => void; // Prop to capture the selected job and pass to the parent
  setIsMobileVisible: (visible: boolean) => void;
  isMobileView: boolean;
}

const JobsList: React.FC<JobsListProps> = ({
  setSelectedJob,
  setIsMobileVisible,
  isMobileView,
}) => {
  const { loading, allJobsData } = useGetAllJobs();

  const [itemsPerPage, setItemsPerPage] = useState(
    window.innerWidth <= 768 ? 5 : 9
  ); // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(DummyJobsList.length / itemsPerPage);

  // Calculate the index range of items to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, DummyJobsList.length);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth <= 768 ? 5 : 9);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (allJobsData.length > 0) {
      setSelectedJob(allJobsData[0]); // Set the first job once the data is loaded...
    }
  }, [allJobsData, setSelectedJob]);

  // Function to handle page navigation
  const goToPage = (page: any) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <Container isMobileView={isMobileView}>
      <MobileListHeader>
        <p>
          JobFeeds <br />
          <span>Here are recommended jobs</span>
        </p>
      </MobileListHeader>
      {loading ? (
        <LoadingOutlined />
      ) : (
        allJobsData.slice(startIndex, endIndex).map((jobs) => (
          <JobListCard
            key={jobs.id}
            imgSrc={''} // TODO: place a default image here
            institutionName={jobs.institutionName}
            jobDescription={jobs.jobDescription.jobDescription}
            yearsOfExperience={jobs.yearsOfExperience}
            pay={jobs.pay}
            onClick={() => {
              setSelectedJob(jobs);

              // Check if the screen width is <= 768px
              if (window.innerWidth <= 768) {
                setIsMobileVisible(true); // Toggle mobile visibility
              }
            }}
          />
        ))
      )}
      <PaginationContainer>
        <PaginationButtonback
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          <LeftArrowButtonIcon />
          Prev.
        </PaginationButtonback>
        <Numbers>
          {Array.from(
            { length: Math.ceil(allJobsData.length / itemsPerPage) },
            (_, i) => (
              <Pagination
                key={i + 1}
                onClick={() => goToPage(i + 1)}
                disabled={currentPage === i + 1}
              >
                {i + 1}
              </Pagination>
            )
          )}
        </Numbers>

        <PaginationButtonfront
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next
          <RightArrowButtonIcon />
        </PaginationButtonfront>
      </PaginationContainer>
    </Container>
  );
};

export default JobsList;

interface JobListProps {
  isMobileView: boolean;
}

const Container = styled.div<JobListProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0.375rem;
  height: 110.5rem;
  transition: top 0.3s ease, opacity 0.3s ease;

  //mobile-specific styles
  @media (max-width: 768px) {
    justify-content: start;
    align-items: center;
    height: calc(100vh + 20%);
    min-height: 100vh;
    top: ${({ isMobileView }) => (isMobileView ? '-100%' : '0')};
    opacity: ${({ isMobileView }) => (isMobileView ? '0' : '1')};
    width: 100%;
    z-index: ${({ isMobileView }) => (isMobileView ? '-10' : '10')};
  }
`;

const PaginationContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: -2%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  //mobile-specific styles
  @media (max-width: 768px) {
    bottom: -12%;
  }
`;

const PaginationButtonback = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  font-size: 16px;
  font-weight: 400;
  width: 79px;
  height: 32px;
  padding: 0.5rem 1rem;
  background-color: #f8f8f8;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    color: #828282;
    cursor: not-allowed;
  }
`;

const PaginationButtonfront = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  font-size: 16px;
  font-weight: 400;
  width: 79px;
  height: 32px;
  padding: 0.5rem 1rem;
  background-color: #2f80ed;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Numbers = styled.div`
  display: flex;
  max-width: 300px;
`;

const Pagination = styled.button`
  cursor: pointer;
  color: #00003d;
  background: none;
  border: none;
  font-size: 20px;
  font-weight: 400;
  &:disabled {
    color: #828282;
    cursor: not-allowed;
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    font-size: 16px;
    padding-right: 0.3rem;
    padding-left: 0.3rem;
  }
`;

const MobileListHeader = styled.div`
  display: none;
  & > p {
    text-align: left;
    font-size: 16px;
    font-weight: 400;
    line-height: 23.92px;
    letter-spacing: -1px;

    & > span {
      font-size: 14px;
      font-weight: 300;
      line-height: 20.93px;
      letter-spacing: -1px;
    }
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
  }
`;
