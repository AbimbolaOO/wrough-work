import { useContext } from 'react';
import ReactDom from 'react-dom';

import styled from '@emotion/styled';

import { ModalContext } from '../../context/ModalContext';

interface IModal {
  children: React.ReactNode;
}

export const Modal: React.FC<IModal> = ({ children }) => {
  const modalRoot = document.getElementById('modal-root');
  const modalContext = useContext(ModalContext);
  return ReactDom.createPortal(
    <ModalContainer className={modalContext?.showModal ? '' : 'closeModal'}>
      {children}
    </ModalContainer>,
    modalRoot!
  );
};

const ModalContainer = styled.div`
  position: fixed;
  overflow: auto;
  top: 0;
  width: 100vw;
  height: 100vh;
  isolation: isolate;
  /* background: rgba(142, 125, 125, 0.448); */
  background: rgba(79, 79, 79, 0.6);
  /* background-color: red; */
  display: grid;
  justify-content: center;

  @media (max-width: 884px) {
    place-items: center;
    justify-content: normal;
  }

  & > * {
    height: fit-content;
  }

  &.closeModal {
    display: None;
  }
`;
