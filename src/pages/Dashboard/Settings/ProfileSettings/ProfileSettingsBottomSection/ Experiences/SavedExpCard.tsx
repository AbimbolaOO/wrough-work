import React from 'react';

import styled from '@emotion/styled';

import InteractiveModal from '../../../../../../components/OldModals/InteractiveModal';
import { ExperienceDataType } from '../../../../../../models/settings/profileSettings/experience.model';

function getFirstAlphabets(input: string): string {
  const words = input.split(' ');
  let result: string;
  if (words.length === 1) {
    const firstLetter = words[0][0]?.toUpperCase();
    const lastLetter = words[0][words[0].length - 1]?.toUpperCase();
    result = firstLetter + lastLetter;
  } else if (words.length >= 2) {
    const firstAlphabet = words[0][0]?.toUpperCase();
    const secondAlphabet = words[1][0]?.toUpperCase();
    result = firstAlphabet + secondAlphabet;
  } else {
    throw new Error('The input string must contain at least one word.');
  }

  return result;
}

const SavedExpCard: React.FC<
  ExperienceDataType & { onEdit: () => {}; onDelete: () => {} }
> = ({
  title,
  qualificationCertificate,
  companyName,
  otherQualification,
  employmentType,
  yearOfQualification,
  location,
  startDate,
  endDate,
  onEdit,
  onDelete,
}) => {
  return (
    <Container>
      <div>
        <Initials>{companyName && getFirstAlphabets(companyName)}</Initials>
        <Details>
          <p>{companyName}</p>
          <p>
            {title} | {employmentType}
          </p>
          <p>
            {startDate}-{endDate} | {location ? location : 'N/A'}
          </p>
        </Details>
      </div>
      <ButtonContainer>
        <button onClick={onEdit}>Edit</button>
      </ButtonContainer>
      <InteractiveModal
        message='Are you sure you want to delete this Experience?'
        confirm={onDelete}
        triggerElement={<Del>Delete</Del>}
      />
    </Container>
  );
};

export default SavedExpCard;

const Container = styled.div`
  position: relative;
  width: 22rem;
  height: 11rem;
  border-radius: 4px;
  border: 1px solid #bdbdbd66;
  & > div:nth-of-type(1) {
    width: 297px;
    height: 71px;
    top: 20px;
    left: 19px;
    position: absolute;
    display: flex;
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    height: 9.5rem;
    border: none;
    background: ${({ theme }) => theme.palette.backgroundColor};

    & > div:nth-of-type(1) {
      width: fit-content;
      gap: 1rem;
    }
  }
`;

const Initials = styled.div`
  background: ${({ theme }) => theme.palette.mainBlue};
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  //mobile-specific styles
  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    font-size: 14px;
  }
`;

const Details = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  & > p {
    font-size: 16px;
    font-weight: 400;
    line-height: 23.92px;
    letter-spacing: -1px;
  }
  & > p:nth-of-type(2) {
    font-size: 16px;
    color: ${({ theme }) => theme.palette.greyGrey2};
  }
  & > p:nth-of-type(3) {
    font-size: 14px;
    color: ${({ theme }) => theme.palette.greyGrey2};
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    & > p {
      font-size: 14px;
    }
    & > p:nth-of-type(2) {
      font-size: 14px;
    }
    & > p:nth-of-type(3) {
      font-size: 12px;
    }
  }
`;

const ButtonContainer = styled.div`
  width: fit-content;
  bottom: 15px;
  right: 20px;
  position: absolute;
  & > button {
    width: 110px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 2px;
    cursor: pointer;
    color: ${({ theme }) => theme.palette.blackBlack2};
    border: 1px solid #000000;
    background-color: inherit;
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    left: 1rem;
    border: none;

    & > button {
      padding: 0;
      font-size: 13px;
      width: fit-content;
      font-weight: 400;
      border: none;
    }
  }
`;

const Del = styled.p`
  width: 110px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 2px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.palette.stateColorRed};
  color: ${({ theme }) => theme.palette.stateColorRed};
  background-color: inherit;
  bottom: 15px;
  right: 150px;
  position: absolute;
  text-align: center;

  //mobile-specific styles
  @media (max-width: 768px) {
    border: none;
    left: 3.5rem;
    bottom: 1rem;
    padding: 0;
    font-size: 13px;
    width: fit-content;
    font-weight: 400;
  }
`;
