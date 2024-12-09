import React from 'react';

import { LoadingOutlined } from '@ant-design/icons';

import EmptyableCard from '../../../../components/Card/EmptyableCard';
import ShiftCard from '../../../../components/Card/ShiftCard';
import useGetAllAppsForUser from '../../../../hooks/getData/useGetAllAppsForUser';
import { expired } from '../../../../utils/utils';

const ActiveShifts = () => {
  const { loading, userAppsData } = useGetAllAppsForUser();
  console.log(userAppsData);

  return (
    <EmptyableCard
      label='Your Active Shift'
      emptyViewNote='You currently don’t have any active shift'
      isEmpty={userAppsData === null}
    >
      {loading ? (
        <LoadingOutlined />
      ) : (
        userAppsData
          .filter(
            (data) =>
              data.status === 'ACCEPTED' &&
              data.job &&
              !expired(data.job.expiryDate)
          )
          .map((data, index) => (
            <ShiftCard key={index} status={data.status} job={data.job} />
          ))
      )}
    </EmptyableCard>
  );
};

export default ActiveShifts;
