import React from 'react';

import styled from '@emotion/styled';

interface ISwitchAccountButton {
  path: string;
}

const SwitchAccountButton: React.FC<ISwitchAccountButton> = ({ path }) => {
  return (
    <Switches>
      <button className='active'>Locum</button>
      <button
        onClick={() => {
          window.location.href = path;
        }}
      >
        Health Institution
      </button>
    </Switches>
  );
};

export default SwitchAccountButton;

const Switches = styled.div`
  width: 100%;
  max-width: 509px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: auto auto;
    width: fit-content;
  }

  & > button {
    width: 238px;
    height: 54px;
    top: 97px;
    left: 45px;
    gap: 0px;
    border-radius: 4px;
    border: 1px solid #828282;
    background-color: white;
    font-size: 20px;
    font-weight: 500;
    color: #828282;
    cursor: pointer;
    display: grid;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
      width: 100%;
      font-size: 16px;
      padding-left: 16px;
      padding-right: 16px;
    }

    @media (max-width: 480px) {
      width: 100%;
      font-size: 16px;
      padding-left: 24px;
      padding-right: 24px;
    }

    @media (max-width: 390px) {
      font-size: 14px;
    }
  }

  & > button.active {
    background-color: #2857d1;
    color: white;
    border: none;
  }
`;
