import ReactDom from 'react-dom';

import styled from '@emotion/styled';

interface IToastWrapper {
  children: React.ReactNode;
}

export const ToastWrapper: React.FC<IToastWrapper> = ({ children }) => {
  const toastArea = document.getElementById('toast-area');

  return ReactDom.createPortal(
    <ToastWrapperContainer>{children}</ToastWrapperContainer>,
    toastArea!
  );
};

const ToastWrapperContainer = styled.div``;
