import React from 'react';

import styled from '@emotion/styled';

import { ClickOutDropDown } from '../DropDown/ClickOutDropDown';
import DeleteIcon from '../Icons/DeleteIcon';
import DoubleCheckMark from '../Icons/DoubleCheckMark';
import ThreeDotVertical from '../Icons/ThreeDotVertical';

interface NotificationCardProps {
  img: string;
  message: string;
  time: string;
}

const NotificationDropDown = () => {
  return (
    <ClickOutDropDown
      tableFilter
      label={
        <IconShell>
          <ThreeDotVertical />
        </IconShell>
      }
      borderRadius='12px'
      posRight='0px'
    >
      <DropDownContent>
        <DropDownCell onClick={() => alert('To be implemented')}>
          <DoubleCheckMark />
          Mark as read
        </DropDownCell>
        <DropDownCell onClick={() => alert('Delete to be implemented')}>
          <DeleteIcon />
          Delete Notification
        </DropDownCell>
      </DropDownContent>
    </ClickOutDropDown>
  );
};

const NotificationCard: React.FC<NotificationCardProps> = ({
  img,
  message,
  time,
}) => {
  return (
    <Container>
      <ImgContainer>UI</ImgContainer>
      <TextPlace>{message}</TextPlace>
      <MenuRegion>
        <NotificationDropDown />
        <Time>14h ago</Time>
      </MenuRegion>
    </Container>
  );
};

export default NotificationCard;

const Container = styled.div`
  display: grid;
  grid-template-columns: 50px auto 84px;
  gap: 16px;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
  padding: 32px;

  &:last-of-type {
    border: none;
  }
`;

const ImgContainer = styled.div`
  border-radius: 25px;
  width: 50px;
  height: 50px;
  background-color: #6e6eff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 18px;
`;

const TextPlace = styled.div`
  display: flex;
  color: ${({ theme }) => theme.palette.blackBlack3};
  font-size: 18px;
`;

const Time = styled.div`
  color: ${({ theme }) => theme.palette.greyGrey2};
  font-size: 14px;
  line-height: 21px;
`;

const MenuRegion = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 10px;
  /* border: 1px solid red; */
`;

const IconShell = styled.div`
  width: 24px;
  display: flex;
  justify-content: flex-end;
  /* margin-left: auto; */
  /* border: 0.5px solid red; */
  cursor: pointer;
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
  padding: 16px;
  align-items: center;

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
