import { useState } from 'react';

import useGetAllActiveShifts from '../jobs/useGetAllActiveShifts';
import useGetCreatedJobPosts from '../jobs/useGetCreatedJobPosts';
import useGetJobApplicationStats from '../jobs/useGetJobApplicationStats';

const useDashboardLoading = () => {
  const [loading, setLoading] = useState(false);
  const { getJobApplicationStats } = useGetJobApplicationStats();
  const { getCreatedJobPosts } = useGetCreatedJobPosts();
  const { getAllActiveShifts } = useGetAllActiveShifts();

  const getDashboardLoadingData = (userId: string) => {
    setLoading(true);

    if (userId) {
      Promise.all([
        getJobApplicationStats(),
        getCreatedJobPosts(userId),
        getAllActiveShifts(),
      ])
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  };

  return { getDashboardLoadingData, loading };
};

export default useDashboardLoading;
