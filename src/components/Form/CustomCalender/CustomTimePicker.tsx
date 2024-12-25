import React, { useRef, useState } from 'react';

import styled from '@emotion/styled';

import useOutsideClick from '../../../hooks/ui-control/useOutsideClick';

interface CustomTimePickerProps {
  setTime: (...args: any) => void;
  time: string;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  setTime,
  time,
}) => {
  const selectFieldRef = useRef<HTMLDivElement>(null);
  useOutsideClick(selectFieldRef, () => setTimeTray(false));
  const [showTimeTray, setTimeTray] = useState(false);
  const [hour, setHour] = useState(-1);
  const [min, setMin] = useState(-1);

  const handleTimeSelection = (value: number, type: string) => {
    const formattedValue = value < 10 ? `0${value}` : `${value}`;
    const [hours, minutes] = time.split(':');
    if (type === 'hour') {
      setTime(`${formattedValue}:${minutes}`);
      setHour(value);
    } else if (type === 'minute') {
      setTime(`${hours}:${formattedValue}`);
      setMin(value);
    }
  };

  return (
    <Container>
      <Time
        type='text'
        id='time'
        name='time'
        placeholder='00:00'
        readOnly
        value={time}
        onClick={() => setTimeTray(true)}
      />
      {showTimeTray && (
        <TimeValues ref={selectFieldRef}>
          <TimeCol>
            {Array.from({ length: 12 }).map((data, index) => (
              <TimeCell
                className={Number(hour) === index + 1 ? 'active' : ''}
                key={index}
                onClick={() => handleTimeSelection(index + 1, 'hour')}
              >
                {index + 1}
              </TimeCell>
            ))}
          </TimeCol>
          <TimeCol>
            {Array.from({ length: 60 }).map((data, index) => (
              <TimeCell
                className={Number(min) === index ? 'active' : ''}
                key={index}
                onClick={() => handleTimeSelection(index, 'minute')}
              >
                {index}
              </TimeCell>
            ))}
          </TimeCol>
        </TimeValues>
      )}
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
  color: #212121;
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

  animation-name: tray-animation;
  animation-duration: 0.3s;
  transform-origin: left;
  animation-timing-function: ease-in-out;

  @keyframes tray-animation {
    from {
      transform: translateY(10px);
      opacity: 30%;
    }
    80% {
      opacity: 90%;
    }
    to {
      transform: translateY(0px);
      opacity: 100%;
    }
  }
`;

const TimeCol = styled.div`
  height: 120px;
  overflow: auto;
  display: grid;
  align-items: center;
  padding: 4px;
  text-align: center;

  white-space: nowrap;
  /* hide scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TimeCell = styled.div`
  display: grid;
  place-content: center;
  font-size: 14px;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.palette.highlightColor};
  }

  &.active {
    background-color: ${({ theme }) => theme.palette.mainBlue};
    color: white;
  }
`;
