import React from 'react';

import styled from '@emotion/styled';

interface IBadge {
  children: string;
}

const Badge: React.FC<IBadge> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Badge;

// Styles
const Container = styled.div`
  border-radius: 6.25rem;
  background: rgba(204, 224, 255, 0.36);
  color: ${({ theme }) => theme.palette.mainBlue};
  padding: 0.62rem 1.62rem;
  font-size: 1.25rem;
  font-weight: 600;
  width: fit-content;
`;
