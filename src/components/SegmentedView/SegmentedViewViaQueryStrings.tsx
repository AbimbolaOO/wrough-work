import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import useQueryString from '../../hooks/ui-control/useQueryString';

interface ISegmentedViewData {
  children: React.ReactNode[] | React.ReactNode | any;
  handleStateChange?: (...args: any) => void;
}

interface ISegmentedViewController extends ISegmentedViewData {
  segmentedViewControllerTitle: Record<string, string>;
  className?: string;
}

export const SegmentedViewViaQueryString: React.FC<
  Pick<ISegmentedViewData, 'children'> & { queryString: string }
> = ({ children, queryString }) => {
  const [queryParams, setQueryParams] = useQueryString();
  const [tabQueryString, setTabQueryString] = useState(queryString);

  useEffect(() => {
    setQueryParams({ applicationState: tabQueryString });

    // eslint-disable-next-line
  }, [tabQueryString]);

  const handleStateChange = (queryStr: any) => {
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
        return (
          <div
            className={clsx(
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
    queryParams?: any;
    segmentedViewControllerTitle: Record<string, any>;
  }
> = ({ children, queryParams, segmentedViewControllerTitle }) => {
  return (
    <SegmentData>
      {React.Children.map(children, (child: any, index) => {
        const isActive =
          Object.keys(segmentedViewControllerTitle)[index] ===
          queryParams?.get('applicationState');

        if (isActive) {
          return React.cloneElement(child, {
            ...child.props,
            className: isActive,
          });
        }

        return null;
      })}
    </SegmentData>
  );
};

// Styles

const SegmentData = styled.div`
  display: block;
`;

const SegmentedViewControllerWrapper = styled.div`
  display: flex;
  gap: 2rem;
  font-weight: 400;
  font-size: 1.125rem;
  text-align: center;
  color: ${({ theme }) => theme.palette.greyGrey1};

  & > * {
    padding: 0.6rem;
    cursor: pointer;
    display: flex;
    gap: 0.5rem;

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
