import React from 'react';

import EmptyableCard from '../../../../components/Card/EmptyableCard';
import ShiftCard from '../../../../components/Card/ShiftCard';
import { IActiveShifts } from '../../../../models/dashboard/jobs/getActiveShifts.model';
import { useAppSelector } from '../../../../redux/store';

const ActiveShifts = () => {
  const allActiveShifts = useAppSelector((state) => state.activeShifts);

  return (
    <EmptyableCard
      label='Your Active Shift'
      emptyViewNote='You currently don’t have any active shift'
    >
      {allActiveShifts?.map((data: IActiveShifts, index) => (
        <ShiftCard key={index} job={data} />
      ))}
    </EmptyableCard>
  );
};

export default ActiveShifts;
