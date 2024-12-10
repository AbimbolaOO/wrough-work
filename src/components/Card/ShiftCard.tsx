import React from 'react';

import styled from '@emotion/styled';

import { IActiveShifts } from '../../models/dashboard/jobs/getActiveShifts.model';
import RichTextDisplay from '../../utils/RichTextDisplay';
import { truncateText } from '../../utils/utils';
import Img from '../Img/Img';

interface ShiftCardProps {
  job: IActiveShifts;
}

const ShiftCard: React.FC<ShiftCardProps> = ({ job }) => {
  return (
    <Container>
      <UpperSection>
        <ImageContainer>
          <Img src='/static/gif/happyAnimal.gif' alt='shift location image' />
        </ImageContainer>
        <div>
          <UpperSectionTitle>{job?.job?.title ?? ''}</UpperSectionTitle>
          <UpperSectionDescription>
            <RichTextDisplay
              richTextContent={truncateText(
                job.job?.jobDescription?.jobDescription
              )}
            />
          </UpperSectionDescription>
        </div>
      </UpperSection>
      <BottomSection>
        <FlexContainer>
          <BottomSectionLabel>Contract Period</BottomSectionLabel>
          <BottomSectionLabel>Pay</BottomSectionLabel>
        </FlexContainer>
        <FlexContainer>
          <BottomSectionData>
            {job.job?.jobStartDate
              ? new Date(job.job?.jobStartDate).toLocaleDateString()
              : 'N/A'}
            <span>&mdash;</span>{' '}
            {job.job?.jobEndDate
              ? new Date(job.job?.jobEndDate).toLocaleDateString()
              : 'N/A'}
          </BottomSectionData>
          <BottomSectionData>
            {job.job?.pay.toLocaleString('en-NG', {
              style: 'currency',
              currency: 'NGN',
            })}{' '}
            {job.job?.payInterval}
          </BottomSectionData>
        </FlexContainer>
      </BottomSection>
    </Container>
  );
};

export default ShiftCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  border: 1px solid ${({ theme }) => theme.palette.borderColor};
  border-radius: 0.25rem;
`;

const UpperSection = styled.div`
  display: grid;
  grid-template-columns: 50px auto;
  gap: 0.5rem;
  padding: 1.25rem;
`;

const UpperSectionTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: normal;
`;

const UpperSectionDescription = styled.div`
  font-size: 0.75rem;
  font-weight: 300;
  color: ${({ theme }) => theme.palette.greyGrey1};
`;
const ImageContainer = styled.div`
  /* width: 3.125rem;
  height: 3.125rem; */
  /* border: 2px solid red; */
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.palette.borderColor};
`;

const BottomSectionLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: normal;
  color: ${({ theme }) => theme.palette.greyGrey2};
`;

const BottomSectionData = styled.div`
  font-size: 0.775rem;
  font-weight: 400;
  line-height: normal;
  color: ${({ theme }) => theme.palette.blackBlackMain};
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
