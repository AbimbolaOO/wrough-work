import { useNavigate } from 'react-router';

import EmptyableCard from '../../../../components/Card/EmptyableCard';
import PostedJobsCard from '../../../../components/Card/PostedJobsCard';
import { IGetCreatedJobs } from '../../../../models/dashboard/jobs/getCreatedJobs.model';
import { useAppSelector } from '../../../../redux/store';
import {
  DASHBOARD,
  MANAGE_POSTED_JOBS,
} from '../../../../routes/routeConstants';

const YourPostedJobs = () => {
  const navigate = useNavigate();
  const jobsCreatedList = useAppSelector((state) => state.jobsCreatedList);

  const handleViewAll = () => {
    navigate(`/${DASHBOARD}/${MANAGE_POSTED_JOBS}`);
  };

  return (
    <EmptyableCard
      label='Your Posted Jobs'
      emptyViewNote={`You currently don't have any post, click the button below to get started`}
      viewAllClick={handleViewAll}
    >
      {jobsCreatedList?.map((data: IGetCreatedJobs, index) => (
        <PostedJobsCard key={index} job={data} />
      ))}
    </EmptyableCard>
  );
};

export default YourPostedJobs;
