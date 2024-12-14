import React from 'react';

import styled from '@emotion/styled';

import CalendarIcon from '../../../../components/Icons/CalenderIcon';
import { Modal } from '../../../../components/Modals/Modal';
import CalenderModal from '../../../../components/Modals/ModalsActions/CalenderModal';
import ModalTriggerContainer from '../../../../components/Modals/ModalTriggerContainer';
import { ModalProvider } from '../../../../context/ModalContext';

const ApplicantCalendarModal = () => {
  return (
    <ModalProvider>
      <ModalTriggerContainer>
        <IconWrapper>
          <CalendarIcon />
        </IconWrapper>
      </ModalTriggerContainer>
      <Modal>
        <CalenderModal />
      </Modal>
    </ModalProvider>
  );
};

export default ApplicantCalendarModal;

const IconWrapper = styled.div`
  cursor: pointer;
`;
