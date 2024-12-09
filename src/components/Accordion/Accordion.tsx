import React, { useReducer } from 'react';

import styled from '@emotion/styled';

import ArrowHead from '../Icons/ArrowHead';

interface IAccordion {
  title: string;
  children: any;
  handleStateChange?: any;
  index?: number;
  isOpen?: boolean;
}

// Type defination
export enum AccordionReducerActionType {
  CLICKED_SECTION = 'section-clicked',
}

interface IAccordionReducerActionType {
  type: AccordionReducerActionType;
  payload: any;
}

// Reducers
function accordionReducer(state: any, action: IAccordionReducerActionType) {
  switch (action.type) {
    case AccordionReducerActionType.CLICKED_SECTION:
      return { ...action.payload };
    default:
      return state;
  }
}

// Components

export const Accordion: React.FC<Pick<IAccordion, 'children'>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(accordionReducer, {
    index: -1,
  });

  const handleStateChange = (index: any) => {
    dispatch({
      type: AccordionReducerActionType.CLICKED_SECTION,
      payload: { index },
    });
  };

  return (
    <AccordionContainer>
      {React.Children.map(children, (child: any, index) => {
        const isOpen = index === state.index ? true : false;
        return React.cloneElement(child, {
          ...child.props,
          handleStateChange,
          index,
          isOpen,
        });
      })}
    </AccordionContainer>
  );
};

export const AccordionCell: React.FC<IAccordion> = ({
  title,
  children,
  handleStateChange,
  isOpen,
  index,
}) => {
  return (
    <AccordionCellWrapper className={isOpen ? 'revealPadding' : ''}>
      <AccordionLabel onClick={() => handleStateChange(index)}>
        <Label>{title}</Label>
        <ArrowHead />
      </AccordionLabel>
      <RevealContent className={isOpen ? 'reveal' : ''}>
        {children}
      </RevealContent>
    </AccordionCellWrapper>
  );
};

// Styles

const AccordionCellWrapper = styled.div`
  border: 2px solid ${({ theme }) => theme.palette.greyGrey3};
  border-radius: 0.75rem;
  padding: 1.5rem 2.69rem;
  display: flex;
  flex-direction: column;
  &.revealPadding {
    gap: 1.25rem;
  }
`;
const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  /* border: 2px solid red; */
`;

const Label = styled.div`
  font-weight: 400;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.palette.blackBlack3};
`;

const AccordionLabel = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 1.8rem;
  cursor: pointer;
`;

const RevealContent = styled.div`
  display: inline block;
  padding: 0;
  height: 0;
  overflow-y: auto;
  transition: all 0.2s ease;

  &.reveal {
    height: fit-content;
    padding-bottom: 1rem;
  }
`;
