import { useContext } from 'react';

import styled from '@emotion/styled';

import { ModalContext } from '../../../context/ModalContext';
import ModalContainer from '../ModalContainer';

const DeleteExperienceModal = () => {
  const modalContext = useContext(ModalContext);
  return (
    <ModalContainer marginTop='20vh'>
      <Container>
        <Text>Are you sure you want to delete?</Text>
        <ButtonArea>
          <DeleteBtn onClick={() => alert('call delete endpoint')}>
            Yes, Delete
          </DeleteBtn>
          <CancelBtn
            onClick={() => {
              modalContext?.displayModal(false);
            }}
          >
            Cancel
          </CancelBtn>
        </ButtonArea>
      </Container>
    </ModalContainer>
  );
};

export default DeleteExperienceModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 38px;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.palette.blackBlackMain};
  font-size: 24px;
  font-weight: 500;
  width: 248px;
  text-align: center;

  @media (max-width: 360px) {
    font-size: 20px;
  }
`;

const CancelBtn = styled.div`
  background: ${({ theme }) => theme.palette.greyGrey1};
  color: white;
  cursor: pointer;
  width: fit-content;
  border-radius: 4px;
  display: grid;
  place-content: center;
  padding: 8px 48px;
  font-weight: 500;
  font-size: 14px;
`;

const DeleteBtn = styled(CancelBtn)`
  background-color: ${({ theme }) => theme.palette.stateColorRed};
`;

const ButtonArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
    width: 100%;

    & > * {
      width: 100%;
    }
  }
`;
