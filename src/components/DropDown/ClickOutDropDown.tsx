import clsx from 'clsx';
import React, { useRef, useState } from 'react';

import styled from '@emotion/styled';

import useOutsideClick from '../../hooks/ui-control/useOutsideClick';

interface ClickOutDropDownProps {
  children: React.ReactNode;
  label: any;
  marginTop?: string;
  borderRadius?: string;
  posRight?: string;
  tableFilter?: boolean;
  noOverflow?: boolean;
}

const DropDownTemplate: React.FC<ClickOutDropDownProps> = ({
  label,
  children,
  marginTop,
  borderRadius,
  posRight,
  tableFilter,
  noOverflow,
}) => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(
    dropDownRef,
    () => {
      setShowDropDown(false);
    },
    '#root'
  );

  return (
    <DropDownContainer
      //
      ref={dropDownRef}
    >
      <DropDownLabel onClick={() => setShowDropDown(!showDropDown)}>
        {label}
      </DropDownLabel>
      {showDropDown && (
        <DropDownContentWrapper
          marginTop={marginTop}
          noOverflow={noOverflow}
          borderRadius={borderRadius}
          posRight={posRight}
          onClick={() => setShowDropDown(!showDropDown)}
          className={clsx(
            showDropDown ? 'dropDownContent' : '',
            tableFilter && 'tableFilter'
          )}
        >
          {/* {children} */}
          {React.Children.map(children, (child: any) =>
            React.cloneElement(child, {
              ...child.prop,
              setShowDropDown,
            })
          )}
        </DropDownContentWrapper>
      )}
    </DropDownContainer>
  );
};

export const ClickOutDropDown: React.FC<ClickOutDropDownProps> = (props) => {
  return <DropDownTemplate {...props} />;
};

const DropDownContainer = styled.div`
  position: relative;

  div.dropDownContent {
    opacity: 1;
    pointer-events: auto;
  }
`;

const DropDownLabel = styled.div`
  display: flex;
  align-items: center;
`;

interface DropDownContentWrapperProps {
  marginTop?: string;
  borderRadius?: string;
  posRight?: string;
  noOverflow?: boolean;
}

const DropDownContentWrapper = styled.div<DropDownContentWrapperProps>`
  position: absolute;
  border: 1px solid ${({ theme }) => theme.palette.borderColor};
  width: fit-content;
  border-radius: ${({ borderRadius }) => borderRadius || '10px'};
  background-color: white;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.05);
  /* overflow: hidden; */
  overflow: ${({ noOverflow }) => (noOverflow ? 'visible' : 'hidden')};
  right: ${({ posRight }) => posRight || '0px'};
  top: 100%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;
  z-index: 5;
  min-width: 100%;
  display: flex;
  margin-top: ${({ marginTop }) => marginTop || '0px'};
`;
