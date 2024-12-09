import React from "react";

import styled from "@emotion/styled";

import ArrowIcon from "../Icons/ArrowIcon";
import DangerIcon from "../Icons/DangerIcon";
import { IButton } from "./interface";

export const PrimaryButton: React.FC<IButton> = ({
  children,
  className,
  arrowIcon,
  click,
}) => {
  return (
    <StyledButton className={className ? className : ""} onClick={click}>
      {children} {arrowIcon && <ArrowIcon />}{" "}
      {className?.includes("danger") && <DangerIcon />}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.palette.mainBlue};
  color: ${({ theme }) => theme.palette.mainBlue};
  text-align: center;
  border-radius: 0.375rem;
  padding: 0.5rem 1.5rem;
  background-color: transparent;
  cursor: pointer;
  font-weight: 400;

  &.grey {
    border: 1px solid ${({ theme }) => theme.palette.greyGrey1};
    color: ${({ theme }) => theme.palette.greyGrey1};
  }

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

  &.transparent {
    padding: 0.94rem 3.62rem;
    background-color: transparent;
    border-color: white;
    color: white;
    border-radius: 0.1875rem;
  }

  &.weight500 {
    font-weight: 500;
    padding: 0.94rem 5.5rem;
  }

  &.noBorder {
    border: 1px solid transparent;
    padding: 0;
    font-size: 1.125rem;
    font-weight: 500;
  }

  &.fw600 {
    font-weight: 600;
  }

  &.pl-pr-4 {
    padding-left: 4rem;
    padding-right: 4rem;
  }

  &.danger {
    border: 1px solid ${({ theme }) => theme.palette.stateColourRed};
    color: ${({ theme }) => theme.palette.stateColourRed};
  }

  &.nowrap {
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    &.respond {
      width: 21rem;
    }

    &.respondsmall {
      padding: 0.2rem;
      font-size: 14px;
    }
  }
`;
