import { useContext } from 'react';

import { ModalContext } from '../../context/ModalContext';

interface ModalTriggerContainerProps {
  children: React.ReactNode;
}

const ModalTriggerContainer: React.FC<ModalTriggerContainerProps> = ({
  children,
}) => {
  const modalContext = useContext(ModalContext);

  const onClick = (e: any) => {
    modalContext?.displayModal(true);
  };

  return (
    <div onClick={onClick} style={{ width: '100%' }}>
      {children}
    </div>
  );
};

export default ModalTriggerContainer;
