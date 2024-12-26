import React from 'react';

import styled from '@emotion/styled';

import ArrowIcon from '../Icons/ArrowIcon';
import { IButton } from './interface';

export const SecondaryButton: React.FC<IButton> = ({
  children,
  className,
  arrowIcon,
  click,
}) => {
  return (
    <StyledButton onClick={click} className={className ? className : ''}>
      {children} {arrowIcon && <ArrowIcon />}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.palette.mainBlue};
  color: white;
  text-align: center;
  border-radius: 0.375rem;
  padding: 0.5rem 1.5rem;
  background-color: ${({ theme }) => theme.palette.mainBlue};
  cursor: pointer;

  &.big {
    padding: 1.25rem;
    font-size: 1.25rem;
    font-weight: 600;
  }

  &.smallGap {
    gap: 0.5rem;
  }

  &.contentFit {
    width: fit-content;
  }

  &.whiteBtn {
    color: ${({ theme }) => theme.palette.mainBlue};
    padding: 1.25rem 3.25rem;
    background-color: white;
    border: 1px solid white;
    font-size: 1.25rem;
    font-weight: 600;
    width: fit-content;
  }

  &.pl-pr-4 {
    padding-left: 4rem;
    padding-right: 4rem;
  }

  &.fw600 {
    font-weight: 600;

    @media (max-width: 540px) {
      width: 100% !important;
      padding-left: 32px;
      padding-right: 32px;
      gap: 16px;
    }
  }

  & > svg {
    width: 24px;
    height: 24px;
  }
`;
