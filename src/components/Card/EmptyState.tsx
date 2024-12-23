import React from 'react';

import styled from '@emotion/styled';

interface EmptyStateProps {
  children: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default EmptyState;

const Container = styled.div`
  display: grid;
  place-content: center;
  color: ${({ theme }) => theme.palette.greyGrey1};
  font-weight: 500;
  width: 100%;
  height: calc(100vh - 244px);
`;
