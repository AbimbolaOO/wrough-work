import React from 'react';

import styled from '@emotion/styled';

import { Modal } from '../../../components/Modals/Modal';
import PostJobModal from '../../../components/Modals/ModalsActions/PostJobModal';
import ShowModalButton from '../../../components/Modals/ShowModalButton';
import { ModalProvider } from '../../../context/ModalContext';

interface HeaderModalButtonProps {
  children: string;
  text?: string;
}

const HeaderModalButton: React.FC<HeaderModalButtonProps> = ({
  children,
  text,
}) => {
  return (
    <ModalProvider>
      <Container>
        <Box text={text}>
          {text && <TextDescription>{text}</TextDescription>}
          <ShowModalButton>{children}</ShowModalButton>
        </Box>
      </Container>
      <Modal>
        <PostJobModal />
      </Modal>
    </ModalProvider>
  );
};

export default HeaderModalButton;

const Container = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

interface IBox {
  text?: string;
}

const Box = styled.div<IBox>`
  cursor: pointer;
  position: absolute;
  bottom: calc(50% - 18px);
  display: flex;
  align-items: center;
  width: 100%;
  gap: 16px;
  justify-content: ${({ text }) => (text ? 'space-between' : 'center')};
  /* margin-left: ${({ text }) => (text ? '0px' : '156px')}; */
`;

const TextDescription = styled.div`
  display: flex;
  color: ${({ theme }) => theme.palette.mainBlue};
  font-weight: 500;
  font-size: 18px;
`;
