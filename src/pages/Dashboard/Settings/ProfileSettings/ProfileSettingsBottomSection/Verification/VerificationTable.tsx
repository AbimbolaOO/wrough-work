import React from 'react';

import styled from '@emotion/styled';

import useGetUserData from '../../../../../../hooks/getData/useGetUserData';

const VerificationTable = () => {
  const { userData, refetch, loading: fetching } = useGetUserData();
  const Headers = ['Action', 'Date', 'Status'];
  return (
    <Table>
      {Headers.map((head, index) => (
        <th key={index}>{head}</th>
      ))}

      <Row>
        <td>Verification Request</td>
        <td>
          {userData?.verification?.yearOfCurrentLicense
            ? new Date(
                userData.verification.yearOfCurrentLicense
              ).toLocaleDateString()
            : 'N/A'}
        </td>
        <td>
          {userData?.verification?.status === 'Pending' ? (
            <Pending>{userData.verification.status}</Pending>
          ) : (
            <Active>{userData?.verification?.status}</Active>
          )}
        </td>
      </Row>
    </Table>
  );
};

export default VerificationTable;

const Table = styled.table`
  width: 100%;
  height: 5rem;
  border-collapse: collapse;
  border-spacing: 0;
  & > p {
    margin-top: 1rem;
    color: ${({ theme }) => theme.palette.mainBlue};
    font-size: 18px;
    font-weight: 500;
    line-height: 20px;
  }
  & > th {
    color: ${({ theme }) => theme.palette.greyGrey1};
    font-size: 18px;
    font-weight: 400;
    line-height: 26.91px;
    letter-spacing: -1px;
    padding-bottom: 1rem;
  }
  & > th:nth-of-type(1) {
    width: 50%;
  }
  & > th:nth-of-type(2) {
    width: 25%;
  }
  & > th:nth-of-type(3) {
    width: 25%;
  }

  // Mobile-specific styles
  @media (max-width: 768px) {
    position: relative;
    height: 10rem;
    display: flex;
    justify-content: center;
    padding: 1rem;
    background: ${({ theme }) => theme.palette.backgroundColor};

    & > th {
      position: absolute;
      left: 1rem;
      padding: 0;
      font-size: 14px;
    }
    & > th:nth-of-type(1) {
      top: 0;
      border: 1px solid blue;
      width: fit-content;
      display: none;
    }
    & > th:nth-of-type(2) {
      top: 40%;
      width: fit-content;
    }
    & > th:nth-of-type(3) {
      top: 72%;
      width: fit-content;
    }
  }
`;

const Row = styled.tr`
  text-align: center;
  height: 3rem;
  & > td {
    font-size: 18px;
    font-weight: 400;
    line-height: 26.91px;
    letter-spacing: -1px;
  }
  & > td:nth-of-type(1) {
    color: #2857d1;
  }
  & > td:nth-of-type(2) {
  }
  & > td:nth-of-type(3) {
    display: flex;
    justify-content: center;
    align-items: center;
    & > p {
      width: 80px;
      height: 30px;
      padding: 10px;
      border-radius: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      font-weight: 300;
    }
  }
  :hover {
    background-color: #f8f8f8;
  }

  // Mobile-specific styles
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    width: 100%;

    & > td {
      width: 100%;
      font-size: 14px;
    }
    & > td:nth-of-type(1) {
      text-align: left;
    }
    & > td:nth-of-type(2) {
      text-align: left;
      padding-left: 2rem;
    }
    & > td:nth-of-type(3) {
      text-align: left;
      justify-content: start;
      padding-left: 2rem;
    }
  }
`;

const Active = styled.p`
  background: #dbfde9;

  // Mobile-specific styles
  @media (max-width: 768px) {
    background: inherit;
    color: ${({ theme }) => theme.palette.stateColorGreen};
  }
`;

const Pending = styled.p`
  background: #fff2c9;

  // Mobile-specific styles
  @media (max-width: 768px) {
    background: inherit;
    color: ${({ theme }) => theme.palette.stateColorYellow};
    font-size: 1px;
  }
`;
