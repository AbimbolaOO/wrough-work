import React from 'react';

import styled from '@emotion/styled';

import { useAppSelector } from '../../../../../../redux/store';
import { formatDate } from '../../../../../../utils/utils';

const headerTitles = ['Action', 'Date', 'Status'];

const VerificationTable = () => {
  const { authData } = useAppSelector((state) => state.auth);
  return (
    <Container>
      <Header className='row'>
        {headerTitles.map((data: string, index) => (
          <div key={index}>{data}</div>
        ))}
      </Header>
      <VerificationBreakdown className='row'>
        <div className='verification'>Verification Request</div>
        <div className='date'>
          {formatDate(`${authData?.verification?.updatedAt}`, true)}
        </div>
        <Badge className={authData?.verification?.status}>
          {authData?.verification?.status}
        </Badge>
      </VerificationBreakdown>

      {authData?.verification?.status === 'Rejected' && (
        <EditButtonArea
          onClick={() => {
            alert('Loading...');
          }}
        >
          Edit Verification
        </EditButtonArea>
      )}
    </Container>
  );
};

export default VerificationTable;

const Container = styled.div`
  display: grid;
  border-top: 1px solid ${({ theme }) => theme.palette.greyGrey3};
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;

  & > .row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
    height: 52px;
    align-items: center;
  }
`;

const Header = styled.div`
  color: ${({ theme }) => theme.palette.greyGrey1};
`;

const VerificationBreakdown = styled.div`
  background-color: ${({ theme }) => theme.palette.greyGrey4};

  & > .verification {
    color: ${({ theme }) => theme.palette.mainBlue};
  }

  & > .date {
    color: ${({ theme }) => theme.palette.blackBlack3};
  }
`;

const EditButtonArea = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  padding: 0.5rem 24px;
  margin-left: auto;
  margin-top: 42px;
  color: white;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.palette.mainBlue};
`;

const Badge = styled.div`
  display: flex;
  font-weight: 300;
  color: ${({ theme }) => theme.palette.greyGrey1};

  width: fit-content;
  align-self: center;
  margin: auto;
  padding: 2px 10px;
  border-radius: 30px;

  &.Pending {
    background-color: #fff2c9;
  }

  &.Approved {
    background-color: #dbfde9;
  }

  &.Rejected {
    background-color: #ff9090;
  }
`;
