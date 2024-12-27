import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from '@emotion/styled';

import { IGetCreatedJobs } from '../../models/dashboard/jobs/getCreatedJobs.model';
import { DASHBOARD, MANAGE_POSTED_JOBS } from '../../routes/routeConstants';
import { salaryInterval } from '../../utils/utils';
import DeleteIcon from '../Icons/DeleteIcon';
import JobsIcon from '../Icons/JobsIcon';
import Img from '../Img/Img';
import ViewApplicantStackedImageCard from './ViewApplicantStackedImageCard';

interface ManageJobsCardProps {
  job: IGetCreatedJobs;
}

const ManagePostedJobsCard: React.FC<ManageJobsCardProps> = ({ job }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <ImageContainer>
        <Img
          // src={imgSrc}
          src={'/static/img/company-placeholder.png'}
          alt='shift location image'
        />
      </ImageContainer>

      <CenterContent>
        <CenterContentHeader>
          <CenterContentText>{job.title}</CenterContentText>
          <Description>{job.institutionName}</Description>
        </CenterContentHeader>

        <CenterContentLowerPart>
          <CenterContentFooter>
            <IconWrapper>
              <JobsIcon />
              {job.yearsOfExperience} year+
            </IconWrapper>

            <div>
              {job.pay.formatCurrency()}/{salaryInterval[job.payInterval] ?? ''}
            </div>
          </CenterContentFooter>
          <ViewApplicant
            onClick={() => navigate(`/${DASHBOARD}/${MANAGE_POSTED_JOBS}/323`)}
          >
            View all applicants
          </ViewApplicant>
        </CenterContentLowerPart>
      </CenterContent>

      <StackedImages>
        <ViewApplicantStackedImageCard
          navUrl={`/${DASHBOARD}/${MANAGE_POSTED_JOBS}/323`}
        />
      </StackedImages>
      <DeleteIconWrapper onClick={() => alert('delete')}>
        <DeleteIcon />
      </DeleteIconWrapper>
    </Container>
  );
};

export default ManagePostedJobsCard;

const Container = styled.div`
  display: grid;
  grid-template-columns: 100px auto 171px 32px;
  gap: 20px;
  width: 100%;
  align-items: center;
  /* border: 1px solid red; */
  box-shadow: 0px 20px 26px 0px rgba(186, 182, 182, 0.16);
  border-radius: 6px;
  padding: 25px 32px;

  @media (max-width: 884px) {
    align-items: flex-start;
  }

  @media (max-width: 768px) {
    grid-template-columns: 100px auto 32px;
  }

  @media (max-width: 540px) {
    grid-template-columns: 50px auto 16px;
    gap: 8px;
    padding: 16px;
  }
`;

const ImageContainer = styled.div`
  width: 100px;
  height: 100px;

  @media (max-width: 540px) {
    width: 50px;
    height: 50px;
  }
`;

const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CenterContentHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const CenterContentText = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.blackBlack2};

  @media (max-width: 768px) {
    font-size: 16px;
    font-weight: 500;
  }
`;

const Description = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.greyGrey1};
`;

const CenterContentFooter = styled.div`
  display: flex;
  gap: 24px;
  color: ${({ theme }) => theme.palette.greyGrey1};
  font-size: 14px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 12px;
    gap: 8px;
  }
`;

const CenterContentLowerPart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

const IconWrapper = styled.div`
  display: grid;
  grid-template-columns: 14px 1fr;
  gap: 4px;
  align-items: center;

  & > svg {
    width: 14px;
    height: 14px;
  }
`;

const StackedImages = styled.div`
  /* border: 1px solid red; */

  @media (max-width: 768px) {
    display: none;
  }
`;

const DeleteIconWrapper = styled.div`
  /* border: 1px solid red; */
  color: ${({ theme }) => theme.palette.stateColorRed};
  display: grid;
  place-content: center;
  cursor: pointer;
  height: fit-content;
`;

const ViewApplicant = styled.div`
  color: ${({ theme }) => theme.palette.mainBlue};
  font-size: 14px;
  cursor: pointer;
`;
