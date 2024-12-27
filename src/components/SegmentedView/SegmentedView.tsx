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

export const SegmentedView: React.FC<Pick<ISegmentedViewData, 'children'>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(segmentedViewReducer, { index: 0 });

  const handleStateChange = (index: any) =>
    dispatch({
      type: SegmentedViewReducerActionType.CLICK_SEGMENT,
      payload: { index },
    });

  return (
    <SegmentedViewContainer>
      {React.Children.map(children, (child: any) => {
        if (child.type === SegmentedViewController) {
          return React.cloneElement(child, {
            ...child.props,
            state,
            handleStateChange,
          });
        } else if (child.type === SegmentedViewData) {
          return React.cloneElement(child, { ...child.props, state });
        }
      })}
    </SegmentedViewContainer>
  );
};

export const SegmentedViewController: React.FC<
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

export const SegmentedViewData: React.FC<
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
  font-size: 1.125rem;
  text-align: center;
  color: ${({ theme }) => theme.palette.greyGrey1};
  /* border: 1px solid blue; */
  /* display: none; */

  & > * {
    padding: 0.6rem;
    cursor: pointer;
    display: flex;
    gap: 0.5rem;
    /* border: 1px solid red; */

    & span {
      display: flex;
    }
  }

  & > div.hollow {
    padding: 10px 58px;
    font-weight: 500;
    border-radius: 0.375rem;
    border: 1px solid ${({ theme }) => theme.palette.greyGrey3};
  }

  & > *:hover {
    color: ${({ theme }) => theme.palette.blackBlack2};
  }

  & > .activeSegment {
    border-radius: 0.375rem;
    background: ${({ theme }) => theme.palette.backgroundColor};
    color: ${({ theme }) => theme.palette.mainBlue};
  }

  @media (max-width: 624px) {
    &.large-screen {
      display: none;
    }
  }

  &.small-screen {
    display: none;
    color: ${({ theme }) => theme.palette.greyGrey3};
    font-size: 16px;
    font-weight: 400;
    gap: 0px;
    justify-content: space-between;
    text-align: left;

    & > *:hover {
      color: ${({ theme }) => theme.palette.greyGrey2};
    }

    & > * {
      padding: 0px;
    }

    @media (max-width: 624px) {
      &.small-screen {
        display: flex;
      }
    }
  }

  &.small-screen {
    @media (max-width: 624px) {
      & > .activeSegment {
        background: transparent;
        color: ${({ theme }) => theme.palette.blackBlack3};
      }
    }
  }

  & > .hollow.activeSegment {
    border-radius: 0.375rem;
    background: white;
    border: 1px solid ${({ theme }) => theme.palette.mainBlue};
  }

  &.hollow {
    @media (max-width: 768px) {
      color: ${({ theme }) => theme.palette.greyGrey3};
      font-size: 14px;
      font-weight: 400;
      gap: 0px;
      justify-content: space-between;
      text-align: left;
      width: calc(100vw - 120px);
      display: grid;
      grid-auto-flow: column;
      gap: 16px;
      overflow: auto;

      /* hide scrollbar */
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
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
  /* border: 1px solid red; */
`;
