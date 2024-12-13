import React from 'react';

import styled from '@emotion/styled';

import { truncateTextByCharacters } from '../../utils/utils';

interface LicenseCardProps {
  school: string;
  title: string;
  degree: string;
  profession: string;
  licensedAt: string;
}

const LicenseCard: React.FC<LicenseCardProps> = ({
  school,
  degree,
  title,
  licensedAt,
}) => {
  return (
    <Container>
      <Box>
        <AbbreviationIcon>UI</AbbreviationIcon>
        <TextPart>
          <div className='name'>
            {title}, {degree}
          </div>
          <div className='title'>{truncateTextByCharacters(school, 40)} </div>
          <div className='title'>Issue On {licensedAt}</div>
        </TextPart>
      </Box>
      <Button onClick={() => alert('work chock')}>View certificate</Button>
    </Container>
  );
};

export default LicenseCard;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 100px;
  gap: 8px;
  justify-content: space-between;
  width: 100%;
  align-items: center;
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
  /* margin-top: -8px; */
  color: ${({ theme }) => theme.palette.greyGrey2};

  & > .name {
    color: ${({ theme }) => theme.palette.blackBlack3};
  }

  & > .title {
    font-size: 14px;
    display: flex;
  }
`;

const Button = styled.div`
  display: flex;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  color: #2f80ed;
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
