import { AxiosError } from 'axios';
import { useState } from 'react';

import { IActiveShifts } from '../../../models/dashboard/jobs/getActiveShifts.model';
import { ErrorHttpResponse, HttpConfig, SuccessHttpResponse } from '../../../models/https';
import { jobActiveShiftActions } from '../../../redux/slices/activeShiftsSlice';
import { useAppDisPatch } from '../../../redux/store';
import useHttps from '../../useHttps';

const useGetAllActiveShifts = () => {
  const request = useHttps();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDisPatch();

  const onGetAllActiveShiftsError = (err: AxiosError<ErrorHttpResponse>) => {
    console.error(err?.message ?? "Something when wrong while fetching active shifts");
  };

  const onGetAllActiveShiftsSuccess = ({
    data,
    message,
  }: SuccessHttpResponse<IActiveShifts[]>) => {
    dispatch(jobActiveShiftActions.getJobActiveShift(data));
  };


  const getAllActiveShifts = async (): Promise<void> => {
    const url: HttpConfig = {
      url: `jobs-service/applications`,
      method: 'get',
    };

    return await request(url, onGetAllActiveShiftsSuccess, setLoading, onGetAllActiveShiftsError);
  };

  return { getAllActiveShifts, loading };
};

export default useGetAllActiveShifts;
