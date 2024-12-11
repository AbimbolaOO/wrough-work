import React, { useState } from 'react';

import styled from '@emotion/styled';

import CircleLeftIcon from '../Icons/CircleLeftIcon';
import CircleRightIcon from '../Icons/CircleRightIcon';

interface PaginationControlProps {
  endPage: number;
  defaultNumOfPagination?: number;
  changePage: (...arg: any) => void;
}

const PaginationControl: React.FC<PaginationControlProps> = ({
  endPage,
  defaultNumOfPagination = 10,
  changePage,
}) => {
  const [activePage, setActivePage] = useState<number>(1);

  const handleRightClick = (e: any) => {
    const index = activePage < endPage ? activePage + 1 : activePage;
    setActivePage(index);
    changePage(index);
  };

  const handleLeftClick = (e: any) => {
    const index = activePage > 1 ? activePage - 1 : activePage;
    setActivePage(index);
    changePage(index);
  };

  const handleNumberClick = (e: any) => {
    const index = Number(e.target.textContent);
    setActivePage(index);
    changePage(index);
  };

  return (
    <Container>
      <IconWrap
        onClick={handleLeftClick}
        className={activePage === 1 ? 'left-disable' : ''}
        disabled={activePage === 1}
      >
        <CircleLeftIcon /> Prev
      </IconWrap>
      {/* First first */}
      {Array.from({
        length:
          endPage > defaultNumOfPagination ? defaultNumOfPagination : endPage,
      }).map((_, index) => (
        <NumberBox
          className={activePage === index + 1 ? 'active' : ''}
          key={index}
          onClick={handleNumberClick}
        >
          {index + 1}
        </NumberBox>
      ))}

      {/* if way greater than defaultNumOfPagination but not the endPage */}
      {activePage > defaultNumOfPagination && activePage < endPage && (
        <>
          <Ellipses>.</Ellipses>
          <NumberBox
            className={activePage > defaultNumOfPagination ? 'active' : ''}
            onClick={handleNumberClick}
          >
            {activePage}
          </NumberBox>
        </>
      )}

      {/* Last number first */}
      {endPage > defaultNumOfPagination && (
        <>
          <Ellipses>...</Ellipses>
          <NumberBox
            className={activePage === endPage ? 'active' : ''}
            onClick={handleNumberClick}
          >
            {endPage}
          </NumberBox>
        </>
      )}
      <IconWrap
        onClick={handleRightClick}
        className={activePage === endPage ? 'right-disable' : ''}
        disabled={activePage === endPage}
      >
        Next <CircleRightIcon />
      </IconWrap>
    </Container>
  );
};

export default PaginationControl;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  margin-left: auto;
  margin: auto;
`;

const IconWrap = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: ${({ theme }) => theme.palette.mainPurple};
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 4px;
  border: none;
  color: white;
  padding: 6px 16px;

  &:hover {
    cursor: pointer;
  }

  &.left-disable {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.palette.greyGrey3};
  }

  &.right-disable {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.palette.greyGrey3};
  }
`;

const NumberBox = styled.div`
  display: flex;
  font-size: 14px;
  border-bottom: 2px solid transparent;
  padding: 6px 2px;
  margin: 0 16px;
  font-weight: 700;
  cursor: pointer;

  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.palette.mainPurple};
  }
`;

const Ellipses = styled.span`
  font-size: 32px;
  font-weight: 700;
  margin: 2px;
  display: flex;
  color: ${({ theme }) => theme.palette.borderColor};
`;
