import React from 'react';

import styled from '@emotion/styled';

import BookmarkBoxIcon from '../../../../components/Icons/BookmarkBoxIcon';
import JobsIcon from '../../../../components/Icons/JobsIcon';
import LocationIcon from '../../../../components/Icons/LocationIcon';
import Img from '../../../../components/Img/Img';

interface IJobInfoHead {
  imgSrc: string;
  title: string;
  institutionName: string;
  location: string;
  yearsOfExperience: string;
  pay: number;
  payInterval: string;
  jobStartDate: Date;
  jobEndDate: Date;
}

const JobInfoHead: React.FC<IJobInfoHead> = ({
  imgSrc,
  title,
  institutionName,
  location,
  yearsOfExperience,
  pay,
  payInterval,
  jobStartDate,
  jobEndDate,
}) => {
  return (
    <Container>
      <ImageContainer>
        <Img src={imgSrc} alt='shift location image' />
      </ImageContainer>
      <CenterContent>
        <CenterContentHeader>
          <CenterContentText>{title}</CenterContentText>
        </CenterContentHeader>
        <CenterContentLowerPart>
          <JobCardDescription>{institutionName}</JobCardDescription>
          <CenterContentFooter>
            <IconWrapper>
              <JobsIcon />
              {yearsOfExperience}
            </IconWrapper>
            <IconWrapper>
              <LocationIcon />
              {location}
            </IconWrapper>
            <div>
              {pay.toLocaleString('en-NG', {
                style: 'currency',
                currency: 'NGN',
              })}{' '}
              <br />
              {payInterval}
            </div>
            <p>
              Contract Duration <br />
              {jobStartDate
                ? new Date(jobStartDate).toLocaleDateString()
                : 'N/A'}
              -{jobEndDate ? new Date(jobEndDate).toLocaleDateString() : 'N/A'}
            </p>
          </CenterContentFooter>
        </CenterContentLowerPart>
      </CenterContent>
      <IconContainer>
        <BookmarkBoxIcon />
      </IconContainer>
    </Container>
  );
};

export default JobInfoHead;

const Container = styled.div`
  display: grid;
  grid-template-columns: 100px auto 32px;
  gap: 0.5rem;
  position: relative;
  width: 100%;

  //mobile-specific styles
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }
`;

const ImageContainer = styled.div`
  width: 3.125rem;
  height: 3.125rem;

  //mobile-specific styles
  @media (max-width: 768px) {
    position: absolute;
    left: 0;
  }
`;

const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.38rem;
  align-self: center;
`;

const IconWrapper = styled.div`
  // display: flex;
  align-items: center;
  gap: 0.2rem;

  & > svg {
    width: 18px;
    height: 18px;
  }
`;

const CenterContentHeader = styled.div`
  display: flex;
  /* border: 2px solid red; */
  align-items: center;
  gap: 0.38rem;

  //mobile-specific styles
  @media (max-width: 768px) {
    margin-left: 4rem;
  }
`;

const CenterContentFooter = styled.div`
  display: flex;
  gap: 1.5rem;
  color: ${({ theme }) => theme.palette.greyGrey1};
  font-size: 0.875rem;
  font-weight: 400;

  //mobile-specific styles
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1.9fr 1fr;
    gap: 1rem;
  }
`;

const CenterContentText = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.blackBlack2};
  /* border: 2px solid yellow; */

  //mobile-specific styles
  @media (max-width: 768px) {
    font-weight: 500;
  }
`;

const CenterContentLowerPart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  /* border: 2px solid green; */
`;

const JobCardDescription = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.mainBlue};

  //mobile-specific styles
  @media (max-width: 768px) {
    margin-left: 4rem;
    line-height: 23.92px;
    letter-spacing: -0.05em;
  }
`;

const IconContainer = styled.div`
  /* width: 2rem; */
  margin-left: auto;
  /* border: 2px solid green; */

  //mobile-specific styles
  @media (max-width: 768px) {
    position: absolute;
    right: 0;
  }
`;
