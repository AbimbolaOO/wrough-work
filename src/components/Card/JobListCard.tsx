import React from 'react';

import styled from '@emotion/styled';

import BookmarkBoxIcon from '../Icons/BookmarkBoxIcon';
import JobsIcon from '../Icons/JobsIcon';
import Img from '../Img/Img';

interface IJobListCard {
  imgSrc: string;
  institutionName: string;
  jobTitle: string;
  yearsOfExperience: string;
  pay: number;
  onClick?: (...args: any) => void;
  className?: string;
}

const JobListCard: React.FC<IJobListCard> = ({
  imgSrc,
  institutionName,
  jobTitle,
  yearsOfExperience,
  pay,
  onClick,
  className,
}) => {
  return (
    <Container className={className} onClick={onClick}>
      <LeftContent>
        <LeftContentHeader>
          <ImageContainer>
            <Img src={imgSrc} alt='logo' />
          </ImageContainer>
          <LeftContentText>{institutionName}</LeftContentText>
        </LeftContentHeader>

        <LeftContentLowerPart>
          <JobCardDescription>{jobTitle}</JobCardDescription>

          <LeftContentFooter>
            <JobAgeArea>
              <JobsIcon />
              {yearsOfExperience} year+
            </JobAgeArea>

            <div>{pay.formatCurrency()}</div>
          </LeftContentFooter>
        </LeftContentLowerPart>
      </LeftContent>

      <IconContainer>
        <BookmarkBoxIcon />
      </IconContainer>
    </Container>
  );
};

export default JobListCard;

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 32px;
  gap: 0.5rem;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => theme.palette.borderColor};
  border-radius: 0.3125rem;
  padding: 1.25rem;
  /* border: 2px solid red; */

  &.cursor-pointer {
    cursor: pointer;
  }

  &.active {
    border: 1px solid #2f80ed;
    background-color: #edf5ff;
  }
`;

const ImageContainer = styled.div`
  width: 40px;
  height: 40px;
  /* border: 2px solid red; */
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.38rem;
`;

const JobAgeArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;

  & > svg {
    width: 12px;
    height: 12px;
  }
`;

const LeftContentHeader = styled.div`
  display: flex;
  /* border: 2px solid red; */
  align-items: center;
  gap: 0.38rem;
`;

const LeftContentFooter = styled.div`
  display: flex;
  gap: 1.5rem;
  color: ${({ theme }) => theme.palette.greyGrey1};
  font-size: 0.875rem;
  font-weight: 400;
`;

const LeftContentText = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.blackBlack2};
`;

const LeftContentLowerPart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

const JobCardDescription = styled.div`
  font-size: 1rem;
  font-weight: 300;
  color: ${({ theme }) => theme.palette.greyGrey1};
`;

const IconContainer = styled.div`
  margin-left: auto;
`;
