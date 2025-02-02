import React from 'react';

import styled from '@emotion/styled';

import ApplicantCalendarModal from '../../pages/Dashboard/ManagePostJobApplicant/Applicant/ApplicantCalendarModal';
import ShowApplicantModal from '../../pages/Dashboard/ManagePostJobApplicant/Applicant/ShowApplicantModal';
import { DEFAULT_IMAGE_URL, timeAgo } from '../../utils/utils';
import { ClickOutDropDown } from '../DropDown/ClickOutDropDown';
import DeleteIcon from '../Icons/DeleteIcon';
import DoubleCheckMark from '../Icons/DoubleCheckMark';
import ThreeDotIcon from '../Icons/ThreeDotIcon';
import Img from '../Img/Img';

const ApplicantCardDropDown = () => {
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

interface ApplicantCardProps {
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  resume: string;
  status: string;
  updatedAt: string;
  userId: string;
}

const ApplicantCard: React.FC<ApplicantCardProps> = ({
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
          <Name>
            Dr. {firstName} {lastName}
          </Name>
          <AppliedAt>Applied {timeAgo(updatedAt)}</AppliedAt>
        </div>
        <MenuRegion>
          <ApplicantCardDropDown />
        </MenuRegion>
      </Upper>
      <Bottom>
        <IconBottom>
          <ShowApplicantModal />
          {/* <FolderIcon /> */}
          <ApplicantCalendarModal />
        </IconBottom>
      </Bottom>
    </Container>
  );
};

export default ApplicantCard;

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
  justify-content: flex-end;
`;

const IconBottom = styled.div`
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(2, 20px);
  align-items: center;
  gap: 32px;
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
