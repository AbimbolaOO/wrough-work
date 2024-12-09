import React from 'react';

import styled from '@emotion/styled';

interface ICard {
  title: string;
  children: string;
  className?: string;
}

const ColoredCard: React.FC<ICard> = ({ title, children, className }) => {
  return (
    <Container className={className ? className : ''}>
      <Title>{title}</Title>
      <MainContent>{children}</MainContent>
    </Container>
  );
};

export default ColoredCard;

// styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border-radius: 0.25rem;
  padding: 3.875rem 1.625rem;

  &.color11 {
    background-color: #ecf9ff;
  }

  &.color12 {
    background-color: #e9ffe9;
  }

  &.color21 {
    background-color: #ffe8e8;
  }

  &.color22 {
    background-color: #fef0ff;
  }
`;

const Title = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.blackBlackMain};
`;

const MainContent = styled.p`
  font-weight: 400;
  color: ${({ theme }) => theme.palette.blackBlack3};
`;
