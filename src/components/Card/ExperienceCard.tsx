import React from 'react';

import styled from '@emotion/styled';

import {
  employmentTypeReversedDict,
  formatDate,
  formatExperienceDate,
  truncateTextByCharacters,
} from '../../utils/utils';

interface ExperienceCardProps {
  title: string;
  companyName: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  companyName,
  employmentType,
  location,
  startDate,
  endDate,
}) => {
  return (
    <Container>
      <Box>
        <AbbreviationIcon>UI</AbbreviationIcon>
        <TextPart>
          <div className='name'>{companyName}</div>
          <div className='title'>
            {truncateTextByCharacters(title, 40)} |{' '}
            {employmentTypeReversedDict[employmentType]}
          </div>
          <div className='title'>
            {formatDate(startDate, true, true)} <span>&mdash;</span>{' '}
            {formatExperienceDate(endDate)} |{' '}
            {truncateTextByCharacters(location, 30)}{' '}
          </div>
        </TextPart>
      </Box>
    </Container>
  );
};

export default ExperienceCard;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 100px;
  gap: 8px;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.greyGrey4};

  padding: 16px;
  padding-left: 32px;
  padding-right: 32px;
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr;
  gap: 8px;
  width: 100%;
`;

const TextPart = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.greyGrey2};

  & > .name {
    color: ${({ theme }) => theme.palette.blackBlack3};
  }
  & > .title {
  }
  & > .title {
    font-size: 14px;
  }
`;

const AbbreviationIcon = styled.div`
  display: grid;
  place-content: center;
  width: 50px;
  height: 50px;
  color: white;
  background-color: ${({ theme }) => theme.palette.mainBlue};
  font-size: 18px;
  font-weight: 400;
  border-radius: 50%;
`;
