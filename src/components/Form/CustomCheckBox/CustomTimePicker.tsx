import React from 'react';

import styled from '@emotion/styled';

const CustomTimePicker = () => {
  return (
    <Container>
      <Time type='text' id='time' name='time' placeholder='00:00' readOnly />
      <TimeValues>
        <div>
          {Array.from({ length: 12 }).map((data, index) => (
            <div key={index}>{index + 1}</div>
          ))}
        </div>
        <div>
          {Array.from({ length: 60 }).map((data, index) => (
            <div key={index}>{index + 1}</div>
          ))}
        </div>
      </TimeValues>
    </Container>
  );
};

export default CustomTimePicker;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  /* border: 1px solid red; */
  justify-content: center;
  align-items: center;
  height: fit-content;
  position: relative;
`;

const Time = styled.input`
  display: flex;
  padding: 8px 14px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 12px;
  width: 64px;
  height: fit-content;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.greyGrey1};
  }
`;

const TimeValues = styled.div`
  /* border: 1px solid red; */
  height: 120px;
  overflow: auto;
  position: absolute;
  top: -120px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  cursor: pointer;
  background-color: white;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.3),
    0px 8px 12px 0px rgba(0, 0, 0, 0.15);
  /* left: 10px; */
  /*
  white-space: nowrap;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  } */

  & > div {
    /* border: 1px solid blue; */
    height: 120px;
    overflow: auto;
    display: grid;
    align-items: center;
    padding: 4px;
    text-align: center;

    white-space: nowrap;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
