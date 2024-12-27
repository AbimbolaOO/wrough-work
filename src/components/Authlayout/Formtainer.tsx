import React from 'react';

import styled from '@emotion/styled';

interface IFormtainer {
  children: React.ReactNode;
  header: string;
  className?: string;
}
const Formtainer: React.FC<IFormtainer> = ({ children, header, className }) => {
  return (
    <Container className={className}>
      <h1>{header}</h1>
      {children}
    </Container>
  );
};

export default Formtainer;

const Container = styled.div`
  box-shadow: 0px 20px 26px 0px #bab6b629;
  width: 100%;
  padding-bottom: 32px;
  width: 37rem;
  display: flex;
  gap: 2rem;
  padding: 45px;
  padding-top: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;

  & > h1 {
    font-size: 24px;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.blackBlackMain};
  }

  @media (max-width: 768px) {
    & > h1 {
      font-size: 20px;
    }

    width: 70%;

    padding-left: 24px;
    padding-right: 24px;
    /* border: 1px solid red; */
  }

  @media (max-width: 480px) {
    width: 90%;
  }
`;
