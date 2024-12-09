import React from "react";
import styled from "@emotion/styled";
import CloseIcon from "../Icons/CloseIcon";

interface IFullScreenModal {
  children: any;
  contentClass?: string;
  closeAction?: any;
}

const FullScreenModal: React.FC<IFullScreenModal> = ({
  children,
  contentClass,
  closeAction,
}) => {
  return (
    <Modal>
      <ModalContent className={contentClass}>
        <CloseBtn onClick={closeAction}>
          <CloseIcon />
          Close
        </CloseBtn>
        {children}
      </ModalContent>
    </Modal>
  );
};

const Modal = styled.div`
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;

  //mobile-specific styles
  @media (max-width: 768px) {
    top: 10%;
    height: calc(100vh - 10%);
    overflow: hidden;
  }
`;

const ModalContent = styled.div`
  position: relative;
  background-color: white;
  padding: 20px;
  padding-top: 4rem;
  padding-left: 3rem;
  padding-right: 3rem;
  border: none;
  height: 95%;
  width: 85%;
  max-width: 1200px;
  border-radius: 10px;

  //mobile-specific styles
  @media (max-width: 768px) {
    padding-left: 1rem;
    padding-right: 1rem;
    width: 100%;
    height: calc(100vh - 9%);
    overflow-y: scroll;
    border-radius: 0;
    background-color: ${({ theme }) => theme.palette.backgroundColor};
  }
`;

const CloseBtn = styled.span`
  position: absolute;
  top: 30px;
  right: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: 16px;
  float: right;
  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

export default FullScreenModal;
