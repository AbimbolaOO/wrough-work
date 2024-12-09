import React from "react";

import styled from "@emotion/styled";

interface ISwitchAccountButton {
  path: string;
}

const SwitchAccountButton: React.FC<ISwitchAccountButton> = ({ path }) => {
  return (
    <Switches>
      <button className="active">Locum</button>
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

    //mobile-specific styles
    @media (max-width: 768px) {
      font-size: 16px;
      width: 180px;
      height: 47px;
    }
  }

  & > button.active {
    background-color: #2857d1;
    color: white;
    border: none;
  }
`;
