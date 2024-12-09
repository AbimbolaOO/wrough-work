import React from "react";
import toast, { Toast } from "react-hot-toast";
import styled from "@emotion/styled";

// Define the types for the props
interface InteractiveModalProps {
  message: string;
  confirm: (param?: string) => void;
  triggerElement: React.ReactNode;
}

// InteractiveModal component
const InteractiveModal: React.FC<InteractiveModalProps> = ({
  message,
  confirm,
  triggerElement,
}) => {
  const showModal = () => {
    toast(
      (t: Toast) => (
        <ModalContainer>
          <p>{message}</p>
          <ButtonContainer>
            <ConfirmButton
              onClick={() => {
                confirm(); // Execute confirm action
                toast.dismiss(t.id); // Dismiss the toast
              }}
            >
              Confirm
            </ConfirmButton>
            <CancelButton
              onClick={() => {
                toast.dismiss(t.id); // Dismiss the toast
              }}
            >
              Cancel
            </CancelButton>
          </ButtonContainer>
        </ModalContainer>
      ),
      {
        duration: 10000, // Keep the modal visible until user interacts
      }
    );
  };

  return (
    <p onClick={showModal} style={{ cursor: "pointer" }}>
      {triggerElement}
    </p>
  );
};

export default InteractiveModal;

// Styled components
const ModalContainer = styled.div`
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ConfirmButton = styled.button`
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.palette.stateColourRed};
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

const CancelButton = styled.button`
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.palette.greyGrey2};
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;
