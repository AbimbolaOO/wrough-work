import React from 'react';

import styled from '@emotion/styled';

interface ITitledSection {
  children: React.ReactNode;
  title: string;
  className?: string;
}

const TitledSection: React.FC<ITitledSection> = ({
  title,
  children,
  className,
}) => {
  return (
    <Container className={className ? className : ''}>
      <Title>{title}</Title>
      {children}
    </Container>
  );
};

export default TitledSection;

// Styled
const Container = styled.section`
  /* border: 2px solid green; */
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 5.6rem 6.25rem 9.19rem;

  &.largeMargin {
    margin-left: 8.19rem;
    margin-right: 8.19rem;
    /* border: 2px solid red; */
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 400;
  text-align: center;
  color: ${({ theme }) => theme.palette.blackBlack2};
`;
