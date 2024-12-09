import React from 'react';

import styled from '@emotion/styled';

interface ISquarePlanCard {
  title: string;
  description: string;
  showFooter?: boolean;
}

const SquarePlanCard: React.FC<ISquarePlanCard> = ({
  title,
  description,
  showFooter,
}) => {
  return (
    <Container className={showFooter ? 'showFooter' : ''}>
      <Title>{title}</Title>
      <MainContent>{description}</MainContent>
      {showFooter && <Footer>Coming Soon...</Footer>}
    </Container>
  );
};

export default SquarePlanCard;

// styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border-radius: 0.25rem;
  box-shadow: 0px 20px 26px 0px rgba(186, 182, 182, 0.16);
  padding: 4.25rem 2.25rem;

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
