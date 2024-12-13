import React from 'react';

import styled from '@emotion/styled';

import BookmarkBoxIcon from '../../../../components/Icons/BookmarkBoxIcon';
import JobsIcon from '../../../../components/Icons/JobsIcon';
import LocationIcon from '../../../../components/Icons/LocationIcon';
import Img from '../../../../components/Img/Img';
import {
  formatDate,
  formatNaira,
  salaryInterval,
} from '../../../../utils/utils';

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
}

// const salaryInterval: Record<string, string> = {
//   HOURLY: 'hour',
//   DAILY: 'day',
//   WEEKLY: 'week',
//   MONTHLY: 'month',
//   YEARLY: 'year',
// };

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

        <CenterContentLowerPart>
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
              {formatNaira(pay)}/{salaryInterval[payInterval] ?? ''}
            </div>
          </CenterContentFooter>
        </CenterContentLowerPart>
      </CenterContent>

      <IconContainer>
        <BookmarkBoxIcon />
      </IconContainer>

      <HeaderBottom>
        <span>
          {jobStartDate ? formatDate(jobStartDate, true, true) : 'N/A'}
        </span>

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
`;

const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
`;

const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CenterContentHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const CenterContentText = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.blackBlack2};
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
`;
