import React from 'react';

import styled from '@emotion/styled';

interface ICard {
  title: string;
  description: string;
  showFooter?: boolean;
  icon: React.ReactNode;
}

const Card: React.FC<ICard> = ({ title, description, showFooter, icon }) => {
  return (
    <Container className={showFooter ? 'showFooter' : ''}>
      {icon}
      <Title>{title}</Title>
      <MainContent>{description}</MainContent>
      {showFooter && <Footer>Comming Soon...</Footer>}
    </Container>
  );
};

export default Card;

// styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border-radius: 0.25rem;
  box-shadow: 0px 20px 26px 0px rgba(186, 182, 182, 0.16);
  padding: 3.13rem 2.19rem;

  &.showFooter {
    padding-bottom: 1.19rem;
  }
`;

const Title = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.blackBlack2};
`;

const MainContent = styled.p`
  font-weight: 400;
`;

const Footer = styled.p`
  color: ${({ theme }) => theme.palette.blackBlack2};
  font-weight: 400;
`;
