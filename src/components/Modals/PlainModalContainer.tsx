import React, { useContext } from 'react';

import styled from '@emotion/styled';

import { ModalContext } from '../../context/ModalContext';
import CloseIcon from '../Icons/CloseIcon';

interface PlainModalContainerProps {
  children: React.ReactNode;
  width?: string;
}
const PlainModalContainer: React.FC<PlainModalContainerProps> = ({
  children,
  width,
}) => {
  const modalContext = useContext(ModalContext);
  const onClickCancel = (e: any) => {
    modalContext?.displayModal(false);
  };

  return (
    <Container
      width={width}
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
      }}
    >
      <IconContainer onClick={onClickCancel}>
        <CloseIcon />
      </IconContainer>

      {children}
    </Container>
  );
};

export default PlainModalContainer;

interface IContainer {
  width?: string;
}
const Container = styled.div<IContainer>`
  padding: 77px;
  padding-top: 30px;
  padding-bottom: 61px;
  border-radius: 10px;
  background-color: transparent;
  margin-top: 60px;
  margin-bottom: 60px;
  /* width: 1080px; */
  width: ${({ width }) => (width ? width : 'fit-content')};

  display: flex;
  flex-direction: column;
  gap: 38px;

  & > * {
    /* border: 1px solid red; */
  }
`;

const IconContainer = styled.div`
  display: flex;
  /* gap: 6px; */
  align-self: flex-end;

  /* margin-right: -46px; */
  cursor: pointer;

  & > svg {
    transform: scale(100%);
    transition: transform 0.3s ease-out;
    &:hover {
      transform: scale(110%);
    }
  }
`;
