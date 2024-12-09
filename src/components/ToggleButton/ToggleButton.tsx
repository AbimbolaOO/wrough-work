import { useState } from 'react';

import styled from '@emotion/styled';

export const ToggleButton: React.FC<IToggleButton> = ({ controller }) => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    controller();
    setIsOn(!isOn);
  };

  return (
    <StyledToggleButton className={isOn ? 'on' : 'off'} onClick={handleToggle}>
      <MovingCircle className={isOn ? 'on' : 'off'} />
    </StyledToggleButton>
  );
};

const StyledToggleButton = styled.div`
  width: 2.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  border-radius: 1rem;
  border: 2px solid #27ae60;
  cursor: pointer;
  transition: background-color 0.4s ease;

  &.on {
    background-color: #27ae60;
  }

  &.off {
    background-color: white;
  }
`;

const MovingCircle = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: #fff;
  border-radius: 50%;
  /* box-shadow: 0 0rem 0.5rem -0.1rem #27AE60; */
  transition: transform 0.2s ease;
  transform: translateX(0);

  &.on {
    transform: translateX(1rem);
  }

  &.off {
    background-color: #27ae60;
  }
`;

interface IToggleButton {
  controller: (...args: any) => void;
}
