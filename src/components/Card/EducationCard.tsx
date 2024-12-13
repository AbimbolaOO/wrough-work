import React from 'react';

import styled from '@emotion/styled';

import { truncateTextByCharacters } from '../../utils/utils';

interface EducationCardProps {
  school: string;
  state: string;
  degree: string;
  license: string;
}

const EducationCard: React.FC<EducationCardProps> = ({
  school,
  state,
  degree,
  license,
}) => {
  return (
    <Container>
      <AbbreviationIcon>UI</AbbreviationIcon>
      <TextPart>
        <div className='name'>
          {truncateTextByCharacters(`${school}`, 30)}, {state}
        </div>
        <div className='title'>
          {truncateTextByCharacters(license, 30)}, {degree}
        </div>
      </TextPart>
    </Container>
  );
};

export default EducationCard;

const Container = styled.div`
  display: flex;
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
