import React from 'react';

import styled from '@emotion/styled';

import SearchIcon from '../../../../components/Icons/SearchIcon';

const JobSearch = () => {
  return (
    <Container>
      <SearchIcon width={18} height={18} color='#292D32' />
      <Input type='text' placeholder='Search' />
      <p>City,State,Job type</p>
    </Container>
  );
};

export default JobSearch;

const Container = styled.div`
  display: none;

  //mobile-specific styles
  @media (max-width: 768px) {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 350px;
    height: 54px;
    border-radius: 6px;
    opacity: 0px;
    background-color: ${({ theme }) => theme.palette.white};
    padding-left: 1rem;
  }

  & > p {
    font-size: 14px;
    font-weight: 300;
    line-height: 20px;
    letter-spacing: -1px;
    text-align: left;
    border-left: 2px solid ${({ theme }) => theme.palette.greyGrey3};
    padding-left: 0.3rem;
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
  }
`;

const Input = styled.input`
  height: 2rem;
  width: 13rem;
  font-size: 14px;
  border: none;

  ::placeholder {
    font-size: 14px;
    font-weight: 300;
    line-height: 20.93px;
    letter-spacing: -0.05em;
  }

  :focus {
    outline: none;
    border: none;
  }
`;
