import React, { useState } from 'react';
import styled from '@emotion/styled';
import CalendarIcon from '../Icons/CalenderIcon';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarInputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  & > svg {
    cursor: pointer;
  }

  .react-datepicker-wrapper {
    display: none;
  }
`;

const CalendarInput = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <CalendarInputContainer>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date)}
        customInput={<CalendarIcon />}
        popperPlacement="bottom-start"
      />
    </CalendarInputContainer>
  );
};

export default CalendarInput;

