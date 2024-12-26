import { useContext } from 'react';

import styled from '@emotion/styled';

import { ModalContext } from '../../context/ModalContext';

interface ShowModalButtonProps {
  children: string;
  icon?: React.ReactNode;
  className?: string;
}

const ShowModalButton: React.FC<ShowModalButtonProps> = ({
  children,
  icon,
  className,
}) => {
  const modalContext = useContext(ModalContext);

  const onClick = (e: any) => {
    modalContext?.displayModal(true);
  };

  return (
    <Button onClick={onClick} className={className}>
      {children}
      {icon}
    </Button>
  );
};

export default ShowModalButton;

const Button = styled.div`
  background-color: ${({ theme }) => theme.palette.mainBlue};
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: white;
  border: none;
  display: grid;
  place-content: center;
  padding: 10px 57.5px;

  &.post-job {
    & {
      width: fit-content;
    }
    @media (max-width: 780px) {
      & {
        font-size: 16px;
        padding: 10px 32px;
        width: fit-content !important;
        margin-left: -18px;
      }
    }

    @media (max-width: 480px) {
      & {
        font-size: 14px;
        padding: 6px 22px;
      }
    }
  }
`;
