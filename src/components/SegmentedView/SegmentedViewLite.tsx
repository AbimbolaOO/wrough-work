import React, { useReducer } from "react";

import styled from "@emotion/styled";

import {
  ISegmentedViewController,
  ISegmentedViewData,
  ISegmentedViewReducerActionType,
  SegmentedViewReducerActionType,
} from "./SegmentedViewTypes";

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
  Pick<ISegmentedViewData, "children">
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
  Omit<ISegmentedViewController, "children">
> = ({ segmentedViewControllerTitle, state, handleStateChange }) => {
  return (
    <SegmentedViewControllerWrapper>
      {segmentedViewControllerTitle.map((data, index) => (
        <div
          className={state?.index === index ? "activeSegment" : ""}
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
  Omit<ISegmentedViewData, "handleStateChange">
> = ({ children, state }) => {
  return (
    <SegmentData>
      {React.Children.map(children, (child: any, index) => {
        const computedClass = state?.index === index ? "showSegment" : "";
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
    /* border: 2px solid red; */
    display: block;
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    // border: 1px solid red;
  }
`;

const SegmentedViewControllerWrapper = styled.div`
  /* border: 2px solid blue; */
  display: flex;
  /* justify-content: center; */
  gap: 2rem;
  font-weight: 400;
  font-size: 1.125rem;
  text-align: center;
  color: ${({ theme }) => theme.palette.greyGrey1};

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
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    font-size: 13.5px;
    color: ${({ theme }) => theme.palette.greyGrey3};

    & > * {
      padding: 0;
      cursor: pointer;
    }

    & > .activeSegment {
      border-radius: 0;
      background: inherit;
      color: ${({ theme }) => theme.palette.blackBlack3};
    }
  }
`;

const SegmentedViewContainer = styled.div`
  /* border: 2px solid green; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: auto;
  gap: 1.5rem;

  //mobile-specific styles
  @media (max-width: 768px) {
    & > div:nth-of-type(1) {
      justify-content: space-between;
      gap: 0.3rem;

      & > div {
        text-wrap: nowrap;
      }
    }
  }
`;
