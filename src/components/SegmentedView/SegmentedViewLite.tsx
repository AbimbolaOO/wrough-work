import clsx from 'clsx';
import React, { useReducer } from 'react';

import styled from '@emotion/styled';

import {
  ISegmentedViewController,
  ISegmentedViewData,
  ISegmentedViewReducerActionType,
  SegmentedViewReducerActionType,
} from './SegmentedViewTypes';

// Reducer

function segmentedViewReducer(
  state: any,
  action: ISegmentedViewReducerActionType
) {
  switch (action.type) {
    case SegmentedViewReducerActionType.CLICK_SEGMENT:
      return { ...action.payload };
    default:
      return state;
  }
}

// Components

export const SegmentedViewLite: React.FC<
  Pick<ISegmentedViewData, 'children'>
> = ({ children }) => {
  const [state, dispatch] = useReducer(segmentedViewReducer, { index: 0 });

  const handleStateChange = (index: any) =>
    dispatch({
      type: SegmentedViewReducerActionType.CLICK_SEGMENT,
      payload: { index },
    });

  return (
    <SegmentedViewContainer>
      {React.Children.map(children, (child: any) => {
        if (child.type === SegmentedViewControllerLite) {
          return React.cloneElement(child, {
            ...child.props,
            state,
            handleStateChange,
          });
        } else if (child.type === SegmentedViewDataLite) {
          return React.cloneElement(child, { ...child.props, state });
        }
      })}
    </SegmentedViewContainer>
  );
};

export const SegmentedViewControllerLite: React.FC<
  Omit<ISegmentedViewController, 'children'>
> = ({ segmentedViewControllerTitle, state, handleStateChange, className }) => {
  return (
    <SegmentedViewControllerWrapper className={className}>
      {segmentedViewControllerTitle.map((data, index) => (
        <div
          className={clsx(
            state?.index === index ? 'activeSegment' : '',
            className
          )}
          onClick={() => handleStateChange!(index)}
          key={index}
        >
          {data.title}
        </div>
      ))}
    </SegmentedViewControllerWrapper>
  );
};

export const SegmentedViewDataLite: React.FC<
  Omit<ISegmentedViewData, 'handleStateChange'>
> = ({ children, state }) => {
  return (
    <SegmentData>
      {React.Children.map(children, (child: any, index) => {
        const computedClass = state?.index === index ? 'showSegment' : '';
        return React.cloneElement(child, {
          ...child.props,
          className: computedClass,
        });
      })}
    </SegmentData>
  );
};

// Styles

const SegmentData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    display: none;
    width: 100%;
  }

  & > .showSegment {
    display: block;
  }
`;

const SegmentedViewControllerWrapper = styled.div`
  display: flex;
  gap: 2rem;
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  color: ${({ theme }) => theme.palette.greyGrey1};

  /* display: none; */

  &.sm-header {
    font-size: 14px;
    margin-left: -32px;
    margin-right: -32px;
    padding-left: 22px;
    padding-right: 22px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.greyGrey4};
  }

  & > * {
    padding: 0.6rem;
    cursor: pointer;
  }

  & > *:hover {
    color: ${({ theme }) => theme.palette.blackBlack2};
  }

  & > .activeSegment {
    border-radius: 0.375rem;
    color: ${({ theme }) => theme.palette.mainBlue};

    /* &.grey {
      color: #333333;
    } */
  }

  @media (max-width: 624px) {
    color: ${({ theme }) => theme.palette.greyGrey3};
    font-size: 16px;
    font-weight: 400;
    gap: 0px;
    justify-content: space-between;
    text-align: left;
    width: calc(100vw - 120px);
    display: grid;
    gap: 16px;
    grid-auto-flow: column;
    /* border: 1px solid blue; */
    overflow: auto;

    /* hide scrollbar */
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }

    & > *:hover {
      color: ${({ theme }) => theme.palette.greyGrey2};
    }

    & > * {
      padding: 0px;
      /* border: 1px solid red; */
      width: fit-content;
      white-space: nowrap;
    }

    & > .activeSegment {
      background: transparent;
      color: ${({ theme }) => theme.palette.blackBlack3};
    }
  }
`;

const SegmentedViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: auto;
  gap: 1.5rem;
`;
