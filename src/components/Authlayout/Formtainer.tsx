import React from "react";

import styled from "@emotion/styled";

interface IFormtainer {
  children: React.ReactNode;
  header: string;
  className?: string;
}
const Formtainer: React.FC<IFormtainer> = ({ children, header, className }) => {
  return (
    <Container className={className}>
      <FormHeader>{header}</FormHeader>
      {children}
    </Container>
  );
};

export default Formtainer;

const Container = styled.div`
  box-shadow: 0px 20px 26px 0px #bab6b629;
  width: 100%;
  padding-bottom: 2rem;
  max-width: 37rem;
  max-height: 85rem;
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

    //mobile-specific styles
    @media (max-width: 768px) {
      font-size: 18px;
    }
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    padding: 1rem;
    height: 100vh;
    justify-content: start;

    &.signin {
      height: 55vh;
    }
  }
`;

const FormHeader = styled.h1`
  color: ${({ theme }) => theme.palette.blackBlackMain};
`;
