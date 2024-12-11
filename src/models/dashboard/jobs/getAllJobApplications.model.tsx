import { IGetCreatedJobs } from './getCreatedJobs.model';

export interface IJobApplications {
  firstName: string;
  lastName: string;
  email: string;
  resume: string;
  id?: string;
  userId?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  job?: IGetCreatedJobs;
}
