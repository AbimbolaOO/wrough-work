import React from 'react';

import styled from '@emotion/styled';

import { IGetCreatedJobs } from '../../models/dashboard/jobs/getCreatedJobs.model';
import RichTextDisplay from '../../utils/RichTextDisplay';
import { truncateText } from '../../utils/utils';
import Img from '../Img/Img';
import { ToggleButton } from '../ToggleButton/ToggleButton';

// The component expects an array of jobs
interface IPostedJobsCard {
  job: IGetCreatedJobs; // Change to accept a single job
}

const PostedJobsCard: React.FC<IPostedJobsCard> = ({ job }) => {
  return (
    <Container>
      <UpperSection>
        <ImageContainer>
          <Img src={''} alt='job' />
        </ImageContainer>
        <div>
          <UpperSectionTitle>{job.title}</UpperSectionTitle>
          <UpperSectionDescription>
            <RichTextDisplay
              richTextContent={truncateText(job?.jobDescription.jobDescription)}
            />
          </UpperSectionDescription>
        </div>
        <ToggleButton
          controller={() => console.log('Toggle')}
          defaultState={job.isPublished}
        />
      </UpperSection>
      <BottomSection>
        <FlexContainer>
          <BottomSectionLabel>Contract Period</BottomSectionLabel>
          <BottomSectionLabel>Pay</BottomSectionLabel>
        </FlexContainer>
        <FlexContainer>
          <BottomSectionData>
            {job.jobStartDate
              ? new Date(job.jobStartDate).toLocaleDateString()
              : 'N/A'}{' '}
            {job.jobEndDate
              ? new Date(job.jobEndDate).toLocaleDateString()
              : 'N/A'}
          </BottomSectionData>
          <BottomSectionData>
            {job.pay.toLocaleString('en-NG', {
              style: 'currency',
              currency: 'NGN',
            })}
          </BottomSectionData>
        </FlexContainer>
      </BottomSection>
    </Container>
  );
};

export default PostedJobsCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.palette.backgroundColor};
`;

const UpperSection = styled.div`
  display: grid;
  grid-template-columns: 50px auto 34px;
  gap: 0.5rem;
  padding: 0.875rem;
`;

const UpperSectionTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 400;
  line-height: normal;

  //mobile-specific styles
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const UpperSectionDescription = styled.div`
  font-size: 0.872rem;
  font-weight: 300;
  color: ${({ theme }) => theme.palette.greyGrey1};

  //mobile-specific styles
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ImageContainer = styled.div`
  height: fit-content;
  border-radius: 50%;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0.875rem;
  border-top: 1px solid ${({ theme }) => theme.palette.borderColor};
`;

const BottomSectionLabel = styled.div`
  font-size: 1.25rem;
  font-weight: 400;
  line-height: normal;
  color: ${({ theme }) => theme.palette.greyGrey2};

  //mobile-specific styles
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const BottomSectionData = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
  line-height: normal;
  color: ${({ theme }) => theme.palette.blackBlackMain};

  //mobile-specific styles
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
