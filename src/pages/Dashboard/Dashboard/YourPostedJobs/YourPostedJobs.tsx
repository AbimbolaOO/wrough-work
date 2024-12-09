import { useNavigate } from 'react-router-dom';

import { LoadingOutlined } from '@ant-design/icons';

import EmptyableCard from '../../../../components/Card/EmptyableCard';
import PostedJobsCard from '../../../../components/Card/PostedJobsCard';
import useGetJobs from '../../../../hooks/getData/useGetPostedJobs';
import { MANAGE_POSTED_JOBS } from '../../../../routes/routeConstants';

const YourPostedJobs = () => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate(`/${MANAGE_POSTED_JOBS}`);
  };

  const { loading, jobsData } = useGetJobs();
  return (
    <EmptyableCard
      label='Your Posted Jobs'
      emptyViewNote='You currently don’t have any post, click the button
      below to get started'
      isEmpty={jobsData.length === 0}
      viewAllClick={handleViewAll}
    >
      {loading ? (
        <LoadingOutlined />
      ) : (
        jobsData.map((job, index) => <PostedJobsCard key={index} job={job} />)
      )}
    </EmptyableCard>
  );
};

export default YourPostedJobs;
