import React from 'react';

import styled from '@emotion/styled';

import LeftTriangleIcon from '../../../../components/Icons/LeftTriangleIcon';

interface BackToJobListButtonProps {
  showMobileInfo?: boolean;
  setShowMobileInfo: (...args: any) => void;
}

const BackToJobListButton: React.FC<BackToJobListButtonProps> = ({
  showMobileInfo,
  setShowMobileInfo,
}) => {
  return (
    <Container
      onClick={() => setShowMobileInfo(!showMobileInfo)}
      className={showMobileInfo ? 'showMobileInfo' : ''}
    >
      <LeftTriangleIcon />
      Back
    </Container>
  );
};

export default BackToJobListButton;

const Container = styled.div`
  align-items: center;
  font-size: 18px;
  color: #2f80ed;
  font-weight: 500;
  cursor: pointer;
  width: fit-content;

  & > svg {
    transition: transform 0.3s ease-in-out;
    transform: translateX(0);
  }

  &:hover > svg {
    transform: translateX(-8px);
  }

  @media (min-width: 884px) {
    display: none;
  }

  @media (max-width: 884px) {
    display: none;
    &.showMobileInfo {
      display: flex;
    }
  }
`;
