import styled from '@emotion/styled';

const DropDownTemplate: React.FC<any> = ({ label, children }) => {
  return (
    <DropDownContainer>
      <DropDownLabel>{label}</DropDownLabel>
      <DropDownContentWrapper className="dropDownContent">
        {children}
      </DropDownContentWrapper>
    </DropDownContainer>
  );
};

export const HoverDropDown: React.FC<IDropDown> = ({ children, label }) => {
  return <DropDownTemplate label={label}>{children}</DropDownTemplate>;
};

// === interfaces
interface IDropDown {
  children: React.ReactNode;
  label: any;
}

const DropDownContainer = styled.div`
  position: relative;
  /* cursor: pointer; */
  /* border: 2px solid red; */

  &:hover > div.dropDownContent {
    opacity: 1;
    pointer-events: auto;
  }
`;

const DropDownLabel = styled.div`
  display: flex;
  align-items: center;
`;

const DropDownContentWrapper = styled.div`
  position: absolute;
  /* border: 1px solid ${({ theme }) => theme.palette.blackBlack2}; */
  border: 1px solid #cdcdd0;
  width: fit-content;
  border-radius: 0.4rem;
  /* padding: 0.75rem 0rem; */
  background-color: white;
  box-shadow: 0px 8px 16px -2px rgba(46, 58, 158, 0.05),
    0px 7px 19px -2px rgba(46, 58, 158, 0.11),
    0px 0px 1px 0px rgba(46, 58, 158, 0.25);
  overflow: hidden;
  right: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;
  z-index: 5;
`;
