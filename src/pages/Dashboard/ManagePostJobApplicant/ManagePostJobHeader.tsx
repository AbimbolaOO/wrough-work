import React from 'react';

import styled from '@emotion/styled';

import JobsIcon from '../../../components/Icons/JobsIcon';
import { formatNaira, salaryInterval } from '../../../utils/utils';

interface ManagePostJobHeaderProps {
  title: string;
  institutionName: string;
  yearsOfExperience: string;
  pay: number;
  payInterval: string;
}

const ManagePostJobHeader: React.FC<ManagePostJobHeaderProps> = ({
  title,
  institutionName,
  yearsOfExperience,
  pay,
  payInterval,
}) => {
  return (
    <CenterContent>
      <CenterContentHeader>
        <CenterContentText>{title}</CenterContentText>
        <Description>{institutionName}</Description>
      </CenterContentHeader>

      <CenterContentLowerPart>
        <CenterContentFooter>
          <IconWrapper>
            <JobsIcon />
            {yearsOfExperience} year+
          </IconWrapper>

          <div>
            {formatNaira(pay)}/{salaryInterval[payInterval] ?? ''}
          </div>
        </CenterContentFooter>
      </CenterContentLowerPart>
    </CenterContent>
  );
};

export default ManagePostJobHeader;

const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 16px;
  /* border-bottom: 1px solid red; */
  margin-left: -32px;
  margin-right: -32px;
  padding-left: 40px;
  padding-right: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.greyGrey4};
  /* border-bottom: #; */
`;

const CenterContentHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const CenterContentText = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.blackBlack2};
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
