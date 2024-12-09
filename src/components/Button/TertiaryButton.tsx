import React from 'react';

import styled from '@emotion/styled';

import { IButton } from './interface';

export const TertiaryButton: React.FC<IButton> = ({ children }) => {
  return <StyledButton>{children}</StyledButton>;
};

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
