import React from 'react';

import styled from '@emotion/styled';

import useDeleteJob from '../../hooks/deleteData/useDeleteJob';
import { JobPostingDataTypeGet } from '../../models/jobPosting/jobPosting.model';
import { ApplicantsDummyData } from '../../pages/Dashboard/Dashboard/PostedJobsDummyData';
import RichTextDisplay from '../../utils/RichTextDisplay';
import { truncateText } from '../../utils/utils';
import BriefcaseIcon from '../Icons/BriefcaseIcon';
import TrashIcon from '../Icons/TrashIcon';
import InteractiveModal from '../OldModals/InteractiveModal';

interface IManageJobsCard {
  job: JobPostingDataTypeGet;
  viewAllClick: () => void;
  refetch: () => void;
}

const ManagePostedJobsCard: React.FC<IManageJobsCard> = ({
  job,
  viewAllClick,
  refetch,
}) => {
  const maxDisplayed = 4;
  const remainingCount = ApplicantsDummyData.length - maxDisplayed;

  // Import and use the deleteJob hook
  const { deleteJob } = useDeleteJob(job.id ? job.id : '');

  const handleConfirm = async () => {
    if (job.id) {
      try {
        await deleteJob(); // Await the deleteJob function
        console.log('Confirmed! Job deleted:', job.id);
        // Delay refetch to give backend time to update.
        setTimeout(() => {
          refetch();
        }, 2000);
      } catch (error) {
        console.error('Failed to delete job:', error);
      }
    }
  };

  return (
    <Container>
      <div>
        <Image>
          <img src={''} alt='img.jpg' />
        </Image>
        <Details>
          <h3>{job.title}</h3>
          <p>
            <RichTextDisplay
              richTextContent={truncateText(job?.jobDescription.jobDescription)}
            />
          </p>
          <p>
            <span>
              <BriefcaseIcon />
              {job.yearsOfExperience}+years
            </span>{' '}
            <span>
              {job.pay.toLocaleString('en-NG', {
                style: 'currency',
                currency: 'NGN',
              })}{' '}
              {job.payInterval}
            </span>
          </p>
        </Details>
      </div>
      <Div2>
        <ul>
          {ApplicantsDummyData.slice(0, maxDisplayed).map(
            (applicant, index) => (
              <li key={index}>
                <img src={applicant.imgSrc} alt='Applicant' />
                {index === maxDisplayed - 1 && remainingCount > 0 && (
                  <RemainingCount>+{remainingCount}</RemainingCount>
                )}
              </li>
            )
          )}
        </ul>
        <p onClick={viewAllClick}>View all Applicants</p>
      </Div2>
      <InteractiveModal
        message='Are you sure you want to delete this job?'
        confirm={handleConfirm}
        triggerElement={
          <Del>
            <TrashIcon />
          </Del>
        }
      />
    </Container>
  );
};

export default ManagePostedJobsCard;

const Container = styled.div`
  box-shadow: 0px 20px 26px 0px #bab6b629;
  border-radius: 6px;
  width: 100%;
  padding: 25px 32px 25px 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    width: 85%;
    display: flex;
    gap: 0.5rem;
    justify-content: space-between;
    align-items: start;
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    background-color: ${({ theme }) => theme.palette.backgroundColor};
    padding-top: 10px;
    flex-direction: column;
    padding: 0;
    position: relative;

    & > div {
      width: 100%;
      position: relative;
    }
  }
`;

const Image = styled.div`
  width: 6.25rem;
  height: 6.25rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  & > img {
    width: 100%;
    height: auto;
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    position: absolute;
    left: 0.3rem;
    top: 0.3rem;
  }
`;

const Details = styled.div`
  width: 80%;
  flex-grow: 1;
  & > h3 {
    font-size: 20px;
    font-weight: 500;
  }
  & > p {
    // max-width: 400px;
    display: flex;
    gap: 2rem;
    font-family: Kanit;
    font-size: 16px;
    font-weight: 300;
    & > span {
      font-size: 14px;
      font-weight: 400;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      & > svg {
        width: 14px;
        height: 14px;
      }
    }
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    width: 100%;
    padding: 0.3rem;

    & > h3 {
      font-size: 18px;
      font-weight: 500;
      line-height: 29.9px;
      letter-spacing: -0.05em;
      padding-left: 3.5rem;
      color: ${({ theme }) => theme.palette.blackBlack3};
    }
    & > p {
      margin-top: 1.5rem;
      width: 100%;
      font-size: 14px;
      line-height: 23.92px;
      letter-spacing: -0.05em;
    }

    & > p:nth-of-type(2) {
      margin-top: 0;
    }
  }
`;

const Div2 = styled.p`
  width: 45%;
  height: 6.7rem;
  display: flex;
  flex-direction: column;
  & > ul {
    position: relative;
    height: 5rem;
    width: 100%;
    & > li {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      top: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      & > img {
        width: 100%;
        height: auto;
      }
    }
    & > li:nth-of-type(1) {
      background-color: yellow;
      left: 25%;
    }
    & > li:nth-of-type(2) {
      background-color: orange;
      left: 35%;
    }
    & > li:nth-of-type(3) {
      background-color: pink;
      left: 45%;
    }
    & > li:nth-of-type(4) {
      background-color: purple;
      left: 55%;
    }
  }
  & > p {
    width: 100%;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: #2857d1;
    cursor: pointer;
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    width: 100%;
    height: fit-content;

    & > ul {
      height: 2.6rem;

      & > li {
        width: 30px;
        height: 30px;
      }

      & > li:nth-of-type(1) {
        background-color: yellow;
        left: 65%;
      }
      & > li:nth-of-type(2) {
        background-color: orange;
        left: 70%;
      }
      & > li:nth-of-type(3) {
        background-color: pink;
        left: 75%;
      }
      & > li:nth-of-type(4) {
        background-color: purple;
        left: 80%;
      }
    }
    & > p {
      text-align: right;
      padding-right: 2rem;
      font-size: 12px;
      line-height: 17.94px;
      letter-spacing: -0.02em;
    }
  }
`;

const RemainingCount = styled.span`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  border-radius: 50%;
  padding: 5px;
  font-size: 12px;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
`;

const Del = styled.p`
  height: 30px;
  width: 30px;
  color: red;
  cursor: pointer;

  //mobile-specific styles
  @media (max-width: 768px) {
    position: absolute;
    bottom: 0.3rem;
    left: 0;
  }
`;
