import React from 'react';

import styled from '@emotion/styled';

import {
  employmentTypeReversedDict,
  formatDate,
  formatExperienceDate,
  truncateTextByCharacters,
} from '../../utils/utils';

interface ExperienceCardCellProps {
  title: string;
  companyName: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate: string;
  setEditExperienceForm?: (...args: any) => void;
  setFormIndex?: (...args: any) => void;
  index: number;
}

const ExperienceCardCell: React.FC<ExperienceCardCellProps> = ({
  title,
  companyName,
  employmentType,
  location,
  startDate,
  endDate,
  setEditExperienceForm,
  setFormIndex,
  index,
}) => {
  return (
    <Container>
      <ImageArea>UI</ImageArea>
      <TextAndButtonsArea>
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
        <ButtonPart>
          <Button
            onClick={() => {
              setEditExperienceForm && setEditExperienceForm(true);
              setFormIndex && setFormIndex(index);
            }}
          >
            Edit
          </Button>
          <Button className='delete'>Delete</Button>
        </ButtonPart>
      </TextAndButtonsArea>
    </Container>
  );
};

export default ExperienceCardCell;

const Container = styled.div`
  display: grid;
  grid-template-columns: 50px auto;
  gap: 16px;
  border: 1px solid ${({ theme }) => theme.palette.greyGrey3};
  border-radius: 4px;
  padding: 24px;

  @media (max-width: 480px) {
    gap: 0px;
    padding: 12px;
  }
`;

const ImageArea = styled.div`
  display: grid;
  place-content: center;
  font-weight: 400;
  font-size: 18px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.mainBlue};
  color: white;

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

const TextAndButtonsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: -7px;
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

const ButtonPart = styled.div`
  display: flex;
  gap: 16px;
  margin-left: auto;
`;

const Button = styled.div`
  display: flex;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  padding: 4px 16px;
  border: 1px solid ${({ theme }) => theme.palette.blackBlackMain};
  cursor: pointer;

  &.delete {
    border-color: ${({ theme }) => theme.palette.stateColorRed};
    color: ${({ theme }) => theme.palette.stateColorRed};
  }
`;
