import React from 'react';

import styled from '@emotion/styled';

import JobsIcon from '../../../../components/Icons/JobsIcon';
import LocationIcon from '../../../../components/Icons/LocationIcon';
import Img from '../../../../components/Img/Img';
import BookmarkJob from '../../../../section/dashboard/BookmarkJob';
import { formatDate, salaryInterval } from '../../../../utils/utils';

interface IJobInfoHead {
  imgSrc: string;
  title: string;
  institutionName: string;
  location: string;
  yearsOfExperience: string;
  pay: number;
  payInterval: string;
  jobStartDate: string;
  jobEndDate: string;
  jobId: string;
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
  jobId,
}) => {
  return (
    <Container>
      <ImageContainer>
        <Img
          // src={imgSrc}
          src={'/static/img/company-placeholder.png'}
          alt='shift location image'
        />
      </ImageContainer>

      <CenterContent>
        <CenterContentHeader>
          <CenterContentText>{title}</CenterContentText>
          <InstitutionName>{institutionName}</InstitutionName>
        </CenterContentHeader>

        <CenterContentLowerPart className='larger-screens'>
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
              {pay.formatCurrency()}/{salaryInterval[payInterval] ?? ''}
            </div>
          </CenterContentFooter>
        </CenterContentLowerPart>
      </CenterContent>

      <IconContainer>
        <BookmarkJob jobId={jobId} />
      </IconContainer>

      <HeaderBottom className='larger-screens'>
        <span>{jobStartDate ? formatDate(jobStartDate, true) : 'N/A'}</span>

        <span>&mdash;</span>

        <span>{jobEndDate ? formatDate(jobEndDate, true) : 'N/A'}</span>
      </HeaderBottom>

      {/* Only on mobile view */}
      <HeaderBottom className='smaller-screens'>
        <CenterContentLowerPart>
          <CenterContentFooter>
            <IconWrapper>
              <JobsIcon />
              {yearsOfExperience}
            </IconWrapper>
            <div>
              {pay.formatCurrency()}/{salaryInterval[payInterval] ?? ''}
            </div>
          </CenterContentFooter>
          <CenterContentFooter>
            <IconWrapper>
              <LocationIcon />
              {location}
            </IconWrapper>
          </CenterContentFooter>
        </CenterContentLowerPart>
      </HeaderBottom>

      {/* Only on mobile view */}
      <HeaderBottom className='smaller-screens'>
        <span>{jobStartDate ? formatDate(jobStartDate, true) : 'N/A'}</span>

        <span>&mdash;</span>

        <span>{jobEndDate ? formatDate(jobEndDate, true) : 'N/A'}</span>
      </HeaderBottom>
    </Container>
  );
};

export default JobInfoHead;

const Container = styled.div`
  display: grid;
  grid-template-columns: 100px auto 32px;
  gap: 10px;
  width: 100%;

  @media (max-width: 540px) {
    /* border: 1px solid red; */
    grid-template-columns: 50px auto 32px;
    gap: 6px;
  }
`;

const ImageContainer = styled.div`
  width: 100px;
  height: 100px;

  @media (max-width: 540px) {
    width: 50px;
    height: 50px;
  }
`;

const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CenterContentHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -7px;
`;

const CenterContentText = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.blackBlack2};

  @media (max-width: 540px) {
    font-size: 16px;
    font-weight: 500;
  }
`;

const InstitutionName = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.mainBlue};
`;

const CenterContentFooter = styled.div`
  display: flex;
  gap: 24px;
  color: ${({ theme }) => theme.palette.greyGrey1};
  font-size: 14px;
  font-weight: 400;

  @media (max-width: 540px) {
    font-size: 12px;
    font-weight: 300;
  }
`;

const IconWrapper = styled.div`
  display: grid;
  grid-template-columns: 14px 1fr;
  gap: 4px;
  align-items: center;

  & > svg {
    width: 14px;
    height: 14px;
  }
`;

const CenterContentLowerPart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;

  &.larger-screens {
    @media (max-width: 540px) {
      display: none;
    }
  }
`;

const IconContainer = styled.div`
  margin-left: auto;
`;

const HeaderBottom = styled.div`
  display: flex;
  gap: 12px;
  font-weight: 700;
  font-size: 14px;
  grid-column: span 3;

  &.smaller-screens {
    @media (max-width: 540px) {
      display: flex;
    }
    @media (min-width: 540px) {
      display: none;
    }
  }

  &.larger-screens {
    @media (max-width: 540px) {
      display: none;
    }
  }
`;
