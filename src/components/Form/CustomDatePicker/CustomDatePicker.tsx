import clsx from 'clsx';
import {
  add,
  differenceInDays,
  endOfMonth,
  format,
  setDate,
  startOfMonth,
  sub,
} from 'date-fns';
import { useField } from 'formik';
import React, { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

import useOutsideClick from '../../../hooks/ui-control/useOutsideClick';
import DatePickerIcon from '../../Icons/DatePickerIcon';
import { FieldErrorInfo, Input, InputLabel, InputWrapper } from '../FormField';

interface CustomDatePickerProps {
  label?: any;
  id: string;
  name: string;
  placeholder?: string;
  className?: string;
  readonly?: boolean;
}

const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  className,
  ...props
}) => {
  const DateFieldRef = useRef<HTMLDivElement>(null);

  useOutsideClick(DateFieldRef, () => setDidTouchDateField(false));
  const [field, meta, helper] = useField(props);
  const [didTouchDateField, setDidTouchDateField] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string>();
  const [submitableDateData, setSubmitableDateData] = useState<string>();

  // help when form is been reset and case where we load in initial values
  useEffect(() => {
    if (!field.value) {
      setSelectedDate(undefined);
      setSubmitableDateData('');
    } else {
      setSelectedDate(format(field.value, 'yyyy-MM-dd'));
      setSubmitableDateData(format(field.value, 'dd/MM/yyyy'));
    }
  }, [field.value]);

  useEffect(() => {
    if (selectedDate && selectedDate !== field.value) {
      helper.setValue(selectedDate);
    }
    // eslint-disable-next-line
  }, [selectedDate]);

  const stateDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const numOfDays = differenceInDays(endDate, stateDate);
  const prefixDays = stateDate.getDay() < 1 ? 6 : stateDate.getDay() - 1;
  const suffixDays = 7 - endDate.getDay();

  const prevMonthEndDate = endOfMonth(
    sub(currentDate, { months: 1 })
  ).getDate();
  const bleedingDaysFromPrevMonth = Number(prevMonthEndDate) - prefixDays;

  const handleDateFieldClick = (e: any) => {
    setDidTouchDateField(true);
  };

  const handleIconClick = (e: any) => {
    setDidTouchDateField(!didTouchDateField);
  };

  const handleDateSelected = (index: number) => {
    if (currentDate) {
      const date = setDate(currentDate, index);
      setSelectedDate(format(date, 'yyyy-MM-dd'));
      setSubmitableDateData(format(date, 'dd/MM/yyyy'));
    }
  };

  const prevMonth = () => setCurrentDate(sub(currentDate, { months: 1 }));
  const nextMonth = () => setCurrentDate(add(currentDate, { months: 1 }));
  const prevYear = () => setCurrentDate(sub(currentDate, { years: 1 }));
  const nextYear = () => setCurrentDate(add(currentDate, { years: 1 }));

  return (
    <InputWrapper className={className}>
      {label && (
        <InputLabel as='div' htmlFor={props.name || props.id}>
          {label}
        </InputLabel>
      )}
      <InputContainer ref={DateFieldRef}>
        <DateFieldBox
          {...field}
          {...props}
          readOnly
          value={submitableDateData || ''}
          placeholder={props.placeholder ?? ''}
          type='text'
          onClick={handleDateFieldClick}
          onChange={() => setSubmitableDateData(submitableDateData)}
          className={didTouchDateField ? 'active' : ''}
        />

        <IconStyle onClick={handleIconClick}>
          <DatePickerIcon />
        </IconStyle>

        {didTouchDateField && (
          <DateBox>
            <MonthLayout>
              <div className='control-chevron' onClick={prevYear}>
                &lt;
              </div>
              <div className='control-chevron' onClick={prevMonth}>
                &lt;
              </div>
              <div className='date-label'>
                {format(currentDate, 'LLLL yyyy')}
              </div>
              <div className='control-chevron' onClick={nextMonth}>
                &gt;
              </div>
              <div className='control-chevron' onClick={nextYear}>
                &gt;
              </div>

              {/* Day Of The Week Label */}
              {daysOfWeek.map((data, index) => (
                <div key={index} className='day-label'>
                  {data}
                </div>
              ))}

              {/* Prefix days */}
              {Array.from({ length: prefixDays }).map((_, index) => (
                <div key={index} className='non-month-date'>
                  {bleedingDaysFromPrevMonth + index + 1}
                </div>
              ))}

              {/*  Day of current Month*/}
              {Array.from({ length: numOfDays + 1 }).map((_, index) => {
                const setActive =
                  format(setDate(currentDate, index + 1), 'yyyy-MM-dd') ===
                  // format(setDate(currentDate, index + 1), 'dd/MM/yyyy') ===
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
                  {index + 1}
                </div>
              ))}
            </MonthLayout>
          </DateBox>
        )}
      </InputContainer>
      {meta.touched && meta.error ? (
        <FieldErrorInfo>{meta.error.capitalize()}</FieldErrorInfo>
      ) : null}
    </InputWrapper>
  );
};

export default CustomDatePicker;

export const InputContainer = styled.div`
  display: grid;
  height: fit-content;
  position: relative;
  height: fit-content;

  & > * {
    grid-column: 1;
    grid-row: 1;
  }
  &:hover {
    cursor: pointer;
  }
`;

const DateFieldBox = styled(Input)`
  width: 100%;

  &.active {
    border-color: ${({ theme }) => theme.palette.greyGrey1};
  }
`;

const IconStyle = styled.div`
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 13px;
  z-index: 8;
`;

const DateBox = styled.div`
  position: absolute;
  top: 100%;
  /* width: 100%;
  max-width: 280px; */
  height: fit-content;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.palette.greyGrey1};
  border-radius: 6px;
  background-color: white;
  margin-top: 4px;
  padding: 8px;
  z-index: 10;
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

  & > div.date-label {
    grid-column: span 3;
    font-size: 12px;
    font-weight: 500;
  }

  & > div.control-chevron {
    border: 1px solid ${({ theme }) => theme.palette.borderColor};
    border-radius: 4px;

    &:hover {
      background-color: #ededed;
    }
  }

  & > div.day-label {
    font-size: 12px;
    font-weight: 700;
  }

  & > div.day-num {
    font-size: 12px;
    font-weight: 400;
    border-radius: 4px;
    height: 24px;
    grid-template-columns: 1fr;
    place-content: center;

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
    /* background-color: red; */
    color: #b4b4b4;
    cursor: default;
  }
`;
