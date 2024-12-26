import React from 'react';

import styled from '@emotion/styled';

import FolderIcon from '../../../../components/Icons/FolderIcon';
import ThreeDotIcon from '../../../../components/Icons/ThreeDotIcon';
import Img from '../../../../components/Img/Img';
import { DEFAULT_IMAGE_URL } from '../../../../utils/utils';
import ApplicantCalendarModal from './ApplicantCalendarModal';
import ShowApplicantModal from './ShowApplicantModal';

const ApplicantCard = () => {
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
        <IconArea>
          <ThreeDotIcon />
        </IconArea>
      </Upper>
      <Bottom>
        <IconBottom>
          <ShowApplicantModal />
          <FolderIcon />
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
  margin-left: auto;
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
  grid-template-columns: repeat(3, 20px);
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
