import React from "react";

import styled from "@emotion/styled";

interface IBanner {
  title: string;
  description: string;
}
const Banner: React.FC<IBanner> = ({ title, description }) => {
  return (
    <Container>
      <Header>{title}</Header>
      <TextArea>{description}</TextArea>
    </Container>
  );
};

export default Banner;

const Container = styled.section`
  width: 100%;
  padding: 1.125rem 3.375rem;
  color: ${({ theme }) => theme.palette.blackBlackMain};
  background-color: white;

  //mobile-specific styles
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  font-size: 1.125rem;
  gap: 0.5rem;
  font-weight: 400;

  //mobile-specific styles
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Header = styled.h2`
  font-size: 1.5rem;

  //mobile-specific styles
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;
