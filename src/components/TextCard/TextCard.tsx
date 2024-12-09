import React from 'react';

import styled from '@emotion/styled';

interface ITextCard {
  children: string;
  title: string;
  className?: string;
}
const TextCard: React.FC<ITextCard> = ({ children, title, className }) => {
  return (
    <Container className={className ? className : ''}>
      <Title className={className ? className : ''}>{title}</Title>
      <Paragraph className={className ? className : ''}>{children}</Paragraph>
    </Container>
  );
};

export default TextCard;

// styles

const Container = styled.div`
  display: flex;
  flex-direction: column;

  &.bigGap {
    gap: 4rem;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.blackBlack2};

  &.whiteText {
    color: white;
  }
`;

const Paragraph = styled.div`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.palette.blackBlack3};

  &.whiteText {
    color: white;
  }
`;
