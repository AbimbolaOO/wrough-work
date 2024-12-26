import React, { useContext } from 'react';

import styled from '@emotion/styled';

import { ModalContext } from '../../context/ModalContext';
import CloseIcon from '../Icons/CloseIcon';

interface ModalContainerProps {
  children: React.ReactNode;
  width?: string;
  padding?: string;
  marginTop?: string;
}
const ModalContainer: React.FC<ModalContainerProps> = ({
  children,
  width,
  padding,
  marginTop,
}) => {
  const modalContext = useContext(ModalContext);
  const onClickCancel = (e: any) => {
    modalContext?.displayModal(false);
  };

  return (
    <Container
      width={width}
      padding={padding}
      marginTop={marginTop}
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

export default ModalContainer;

interface IContainer {
  width?: string;
  padding?: string;
  marginTop?: string;
}
const Container = styled.div<IContainer>`
  padding: ${({ padding }) => (padding ? padding : '30px 77px 61px')};
  border-radius: 10px;
  background-color: white;
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : '60px')};
  margin-bottom: 60px;
  width: ${({ width }) => (width ? width : 'fit-content')};

  display: flex;
  flex-direction: column;
  gap: 38px;

  @media (max-width: 884px) {
    width: 90vw;
    padding: 42px;
  }

  @media (max-width: 480px) {
    padding: 42px 24px;
    width: 94vw;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-self: flex-end;

  cursor: pointer;

  & > svg {
    transform: scale(100%);
    transition: transform 0.3s ease-out;
    &:hover {
      transform: scale(110%);
    }
  }
`;
