import clsx from 'clsx';
import { add, differenceInDays, endOfMonth, format, setDate, startOfMonth, sub } from 'date-fns';
import { useField } from 'formik';
import React, { useEffect, useRef, useState } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import useOutsideClick from '../../../hooks/ui-control/useOutsideClick';
import ChevronLeftIcon from '../../Icons/ChevronLeftIcon';
import ChevronRightIcon from '../../Icons/ChevronRightIcon';
import CustomTimePicker from './CustomTimePicker';

interface CustomCalenderProps {
  label?: any;
  id: string;
  name: string;
  placeholder?: string;
  className?: string;
  readonly?: boolean;
  allowYear?: boolean;
  submitBtn?: boolean;
  isSubmitting?: boolean;
}

const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const CustomCalender: React.FC<CustomCalenderProps> = ({
  label,
  className,
  allowYear,
  submitBtn = true,
  isSubmitting = true,
  ...props
}) => {
  const DateFieldRef = useRef<HTMLDivElement>(null);
  useOutsideClick(DateFieldRef, () => setDidTouchDateField(false));
  const [field, meta, helper] = useField(props);
  const [didTouchDateField, setDidTouchDateField] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string>();

  const handleAmPmToggle = (e: any) => {
    console.log('any', e.target);
  };

  useEffect(() => {
    if (selectedDate) {
      helper.setValue(selectedDate);
    }
    // eslint-disable-next-line
  }, [selectedDate]);

  const stateDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const numOfDays = differenceInDays(endDate, stateDate);
  const prefixDays = stateDate.getDay() < 1 ? 6 : stateDate.getDay() - 1;
  const suffixDays = 7 - endDate.getDay();

  //   const prevMonthEndDate = endOfMonth(
  //     sub(currentDate, { months: 1 })
  //   ).getDate();

  //   const bleedingDaysFromPrevMonth = Number(prevMonthEndDate) - prefixDays;

  //   const handleDateFieldClick = (e: any) => {
  //     setDidTouchDateField(true);
  //   };

  //   const handleIconClick = (e: any) => {
  //     setDidTouchDateField(!didTouchDateField);
  //   };

  const handleDateSelected = (index: number) => {
    if (currentDate) {
      const date = setDate(currentDate, index);
      // setSelectedDate(format(date, 'yyyy-MM-dd'));
      setSelectedDate(format(date, 'dd/MM/yyyy'));
    }
  };

  const prevMonth = () => setCurrentDate(sub(currentDate, { months: 1 }));
  const nextMonth = () => setCurrentDate(add(currentDate, { months: 1 }));
  const prevYear = () => setCurrentDate(sub(currentDate, { years: 1 }));
  const nextYear = () => setCurrentDate(add(currentDate, { years: 1 }));

  return (
    <DateBox>
      <Control allowYear={allowYear}>
        {allowYear && (
          <div className='control-chevron' onClick={prevYear}>
            <ChevronLeftIcon /> <ChevronLeftIcon />
          </div>
        )}
        <div className='control-chevron' onClick={prevMonth}>
          <ChevronLeftIcon />
        </div>
        <div className='date-label'>{format(currentDate, 'LLLL yyyy')}</div>
        <div className='control-chevron end' onClick={nextMonth}>
          <ChevronRightIcon />
        </div>
        {allowYear && (
          <div className='control-chevron end' onClick={nextYear}>
            <ChevronRightIcon /> <ChevronRightIcon />
          </div>
        )}
      </Control>

      <MonthLayout>
        {/* Day Of The Week Label */}
        {daysOfWeek.map((data, index) => (
          <div key={index} className='day-label'>
            {data}
          </div>
        ))}

        {/* Prefix days */}
        {Array.from({ length: prefixDays }).map((_, index) => (
          <div key={index} className='non-month-date'>
            {/* {bleedingDaysFromPrevMonth + index + 1} */}
          </div>
        ))}

        {/*  Day of current Month*/}
        {Array.from({ length: numOfDays + 1 }).map((_, index) => {
          const setActive =
            // format(setDate(currentDate, index + 1), 'yyyy-MM-dd') ===
            format(setDate(currentDate, index + 1), 'dd/MM/yyyy') ===
            field.value;
          return (
            <div
              key={index}
              className={clsx(setActive && 'active-date', 'day-num')}
              onClick={(e: any) => handleDateSelected(index + 1)}
            >
              {index + 1}
            </div>
          );
        })}

        {/*  Suffix days*/}
        {Array.from({ length: suffixDays }).map((_, index) => (
          <div key={index} className='non-month-date'>
            {/* {index + 1} */}
            {}
          </div>
        ))}
      </MonthLayout>
      <TimeArea>
        {/* <Time type='time' id='time' name='time' /> */}
        <CustomTimePicker />

        <ToggleAMPM onClick={handleAmPmToggle}>
          <div className='left'>AM</div>
          <div className='right'>PM</div>
        </ToggleAMPM>
        {submitBtn && (
          <SubmitButton>
            Set{' '}
            <div>
              <LoadingOutlined />
            </div>
          </SubmitButton>
        )}
      </TimeArea>
    </DateBox>
  );
};

export default CustomCalender;

const DateBox = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  gap: 16px;
  flex-direction: column;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.3),
    0px 8px 12px 0px rgba(0, 0, 0, 0.15);
  padding: 16px;
  z-index: 10;
`;

interface IControl {
  allowYear?: boolean;
}

const Control = styled.div<IControl>`
  display: grid;
  gap: 20px;
  grid-template-columns: ${({ allowYear }) =>
    allowYear ? 'repeat(7, 1fr)' : 'repeat(5, 1fr)'};
  align-items: center;

  & > div {
    height: 40px;
    display: grid;
    place-content: center;
  }

  /*  */
  & > div.date-label {
    grid-column: span 3;
    font-size: 14px;
    font-weight: 500;
    color: #212121;
  }

  & > div.control-chevron {
    display: flex;
    height: fit-content;
    width: fit-content;

    & > svg {
      width: 16px;
      height: 16px;
    }

    &.end {
      justify-self: flex-end;
    }

    &:hover {
      background-color: #ededed;
    }
  }
`;

const MonthLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  /* border: 1px solid blue; */
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 4px;
  color: #212121;

  & > div {
    width: 40px;
    height: 40px;
    display: grid;
    place-content: center;
  }

  & > div.day-num {
    font-size: 12px;
    font-weight: 400;

    &:hover {
      background-color: #ededed;
    }

    &.active-date {
      background-color: ${({ theme }) => theme.palette.mainBlue};
      color: white;
      font-weight: 500;
    }
  }

  & > div.non-month-date {
    font-size: 12px;
    font-weight: 400;
    color: #b4b4b4;
    cursor: default;
  }
`;

const TimeArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ToggleAMPM = styled.div`
  /* border: 1px solid red; */
  font-size: 12px;
  font-weight: 500;
  display: flex;
  cursor: pointer;

  & > div {
    /* border: 1px solid #616161; */
    border: 1px solid #e0e0e0;
    padding: 8px 12px;
  }

  & > div.right {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-left: -1px;
  }

  & > div.left {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    /* margin-left: -3px; */
  }
`;

const SubmitButton = styled.div`
  display: flex;
  padding: 8px 24px;
  font-size: 12px;
  border-radius: 4px;
  margin-left: auto;
  font-weight: 500;
  background-color: ${({ theme }) => theme.palette.mainBlue};
  color: white;
  cursor: pointer;
  gap: 12px;
`;
