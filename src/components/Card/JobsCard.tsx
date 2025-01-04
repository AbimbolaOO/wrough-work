import React from 'react';

import styled from '@emotion/styled';

import { extractTextFromHTML, truncateText } from '../../utils/utils';
import { PrimaryButton } from '../Button';
import BookmarkBoxIcon from '../Icons/BookmarkBoxIcon';
import Img from '../Img/Img';
import { ButtonLink } from '../Link/Link';

interface IJobsCard {
  imgSrc?: string;
  institutionName: string;
  jobDescription: string;
  link?: string;
}

const JobsCard: React.FC<IJobsCard> = ({
  imgSrc = '/static/gif/happyAnimal.gif',
  institutionName,
  jobDescription,
  link = '/',
}) => {
  return (
    <Container>
      <JobCardHeader>
        <ImageContainer>
          <Img src={imgSrc} alt='img' />
        </ImageContainer>
        <JobCardHeaderText>{institutionName}</JobCardHeaderText>
        <IconContainer>
          <BookmarkBoxIcon />
        </IconContainer>
      </JobCardHeader>
      <JobCardDescription>
        <span>{truncateText(extractTextFromHTML(jobDescription), 20)}</span>
      </JobCardDescription>
      <ButtonLink to={link}>
        <PrimaryButton arrowIcon className='noBorder'>
          Apply
        </PrimaryButton>
      </ButtonLink>
    </Container>
  );
};

export default JobsCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => theme.palette.borderColor};
  border-radius: 0.3125rem;
  padding: 0.7rem;
`;

const ImageContainer = styled.div`
  /* width: 3.125rem;
  height: 3.125rem; */
  /* border: 2px solid red; */
`;

const JobCardHeader = styled.div`
  display: grid;
  grid-template-columns: 48px auto 32px;
  gap: 0.81rem;
  width: 100%;
`;

const JobCardHeaderText = styled.div`
  font-size: 1.25rem;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.blackBlack2};

  //mobile-specific styles
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const JobCardDescription = styled.div`
  font-size: 1rem;
  font-weight: 300;
  color: ${({ theme }) => theme.palette.greyGrey1};

  //mobile-specific styles
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const IconContainer = styled.div`
  /* width: 2rem; */
  margin-left: auto;
`;
