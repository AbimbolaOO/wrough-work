import React from 'react';

import styled from '@emotion/styled';

import UserIcon from '../../../../components/Icons/UserIcon';
import { Modal } from '../../../../components/Modals/Modal';
import ApplicantProfileModal from '../../../../components/Modals/ModalsActions/ApplicantProfileModal';
import ModalTriggerContainer from '../../../../components/Modals/ModalTriggerContainer';
import { ModalProvider } from '../../../../context/ModalContext';

const ShowApplicantModal = () => {
  return (
    <ModalProvider>
      <ModalTriggerContainer>
        <IconWrapper>
          <UserIcon />
        </IconWrapper>
      </ModalTriggerContainer>
      <Modal>
        <ApplicantProfileModal />
      </Modal>
    </ModalProvider>
  );
};

export default ShowApplicantModal;

const IconWrapper = styled.div`
  cursor: pointer;
`;
