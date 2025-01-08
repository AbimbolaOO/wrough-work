import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import useQueryString from '../../hooks/ui-control/useQueryString';
import { ISegmentedViewData } from './SegmentedViewTypes';

export interface ISegmentedViewController extends ISegmentedViewData {
  segmentedViewControllerTitle: Record<string, string>;
  className?: string;
}

export const SegmentedViewViaQueryString: React.FC<
  Pick<ISegmentedViewData, 'children'> & { queryString: string }
> = ({ children, queryString }) => {
  // const [state, dispatch] = useReducer(segmentedViewReducer, { index: 0 });
  const [queryParams, setQueryParams] = useQueryString();
  const [tabQueryString, setTabQueryString] = useState(queryString);

  useEffect(() => {
    // console.log('@@@--->>>', tabQueryString);
    setQueryParams({ applicationState: tabQueryString });
  }, [tabQueryString]);

  // useEffect(() => {
  //   if (queryParams?.get('applicationState')) {
  //     setTabQueryString(queryParams.applicationState);
  //   }
  // }, [queryParams]);

  const handleStateChange = (queryStr: any) => {
    // console.log('LOL--->>>', queryStr);
    // setQueryParams(queryStr);
    setTabQueryString(queryStr);
  };

  return (
    <SegmentedViewContainer>
      {React.Children.map(children, (child: any) => {
        if (child.type === SegmentedViewControllerViaQueryString) {
          return React.cloneElement(child, {
            ...child.props,
            queryParams,
            handleStateChange,
          });
        } else if (child.type === SegmentedViewDataViaQueryStrings) {
          return React.cloneElement(child, {
            ...child.props,
            tabQueryString,
            queryParams,
          });
        }
      })}
    </SegmentedViewContainer>
  );
};

export const SegmentedViewControllerViaQueryString: React.FC<
  Omit<ISegmentedViewController, 'children'> & { queryParams?: any }
> = ({
  segmentedViewControllerTitle,
  queryParams,
  handleStateChange,
  className,
}) => {
  return (
    <SegmentedViewControllerWrapper className={className}>
      {Object.keys(segmentedViewControllerTitle).map((title, index) => {
        // console.log('@@£@________@@@@', data?.title, queryString, '()))))');
        return (
          <div
            className={clsx(
              // state?.index === index ? 'activeSegment' : '',
              title === queryParams.get('applicationState')
                ? 'activeSegment'
                : '',
              className
            )}
            onClick={() => handleStateChange!(title)}
            key={index}
          >
            {title}
          </div>
        );
      })}
    </SegmentedViewControllerWrapper>
  );
};

export const SegmentedViewDataViaQueryStrings: React.FC<
  Omit<ISegmentedViewData, 'handleStateChange'> & {
    tabQueryString?: string;
    queryParams?: any;
    segmentedViewControllerTitle: Record<string, any>;
  }
> = ({
  children,
  queryParams,
  tabQueryString,
  segmentedViewControllerTitle,
}) => {
  return (
    <SegmentData>
      {React.Children.map(children, (child: any, index) => {
        // const computedClass = state?.index === index ? 'showSegment' : '';
        const computedClass =
          segmentedViewControllerTitle[tabQueryString ?? ''] ===
          queryParams?.get('applicationState');

        console.log(
          '@@@--->>>',
          computedClass,
          tabQueryString,
          queryParams?.get('applicationState')
        );

        if (computedClass) {
          return React.cloneElement(child, {
            ...child.props,
            // className: computedClass,
          });
        }
      })}
      {/* LOL */}
    </SegmentData>
  );
};

// Styles

const SegmentData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* & > * {
    display: none;
    width: 100%;
  }

  & > .showSegment {
    display: block;
  } */
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
    height: 44px;
    display: grid;
    place-content: center;
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
