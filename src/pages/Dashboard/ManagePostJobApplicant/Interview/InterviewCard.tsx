import React from 'react';

import styled from '@emotion/styled';

import { ClickOutDropDown } from '../../../../components/DropDown/ClickOutDropDown';
import DeleteIcon from '../../../../components/Icons/DeleteIcon';
import DoubleCheckMark from '../../../../components/Icons/DoubleCheckMark';
import ThreeDotIcon from '../../../../components/Icons/ThreeDotIcon';
import Img from '../../../../components/Img/Img';
import { IApplicantData } from '../../../../models/dashboard/jobs/singleJobApplicants.model';
import { DEFAULT_IMAGE_URL } from '../../../../utils/utils';
import InterviewCardForm from './InterviewCardForm';

const InterviewCardDropDown = () => {
  return (
    <ClickOutDropDown
      tableFilter
      label={
        <IconArea>
          <ThreeDotIcon />
        </IconArea>
      }
      borderRadius='12px'
      posRight='0px'
    >
      <DropDownContent>
        <DropDownCell onClick={() => alert('To be implemented')}>
          <DoubleCheckMark />
          Accept
        </DropDownCell>
        <DropDownCell onClick={() => alert('Delete to be implemented')}>
          <DeleteIcon />
          Reject
        </DropDownCell>
      </DropDownContent>
    </ClickOutDropDown>
  );
};

interface InterviewCardProps extends IApplicantData {}

const InterviewCard: React.FC<InterviewCardProps> = ({
  createdAt,
  email,
  firstName,
  id,
  lastName,
  resume,
  status,
  updatedAt,
  userId,
}) => {
  return (
    <Container>
      <Upper>
        <ImageHolder>
          <Img src={DEFAULT_IMAGE_URL} alt='image' />
        </ImageHolder>
        <div>
          <Name>Dr. Daniel Peters</Name>
          <AppliedAt>Applied 2 days ago</AppliedAt>
        </div>
        <MenuRegion>
          <InterviewCardDropDown />
        </MenuRegion>
      </Upper>
      <Bottom>
        <InterviewCardForm />
      </Bottom>
    </Container>
  );
};

export default InterviewCard;

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.greyGrey4};
  box-shadow: 0px 20px 26px 0px rgba(186, 182, 182, 0.16);
  border-radius: 6px;
`;

const Upper = styled.div`
  display: flex;
  gap: 6px;
  padding: 13px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.greyGrey2};
`;

const ImageHolder = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

const IconArea = styled.div`
  cursor: pointer;
  /* border: 2px solid red; */
  height: 16px;
  display: grid;
  place-content: center;
`;

const Bottom = styled.div`
  padding: 13px 16px;
  width: 100%;
  display: flex;
  gap: 16px;
`;

const Name = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.blackBlack2};
`;

const AppliedAt = styled.div`
  display: flex;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.greyGrey2};
`;

const DropDownContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* pad */
`;

const DropDownCell = styled.div`
  display: grid;
  grid-template-columns: 16px 132px;
  gap: 18px;
  padding: 8px;
  align-items: center;
  width: 132px;

  &:first-of-type {
    border-bottom: 1px solid #e9eeef;
  }

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.palette.greyGrey4};
  }

  &:last-of-type {
    color: ${({ theme }) => theme.palette.stateColorRed};
  }
`;

const MenuRegion = styled.div`
  margin-left: auto;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 10px;
`;
