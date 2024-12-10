import { IGetCreatedJobs } from './getCreatedJobs.model';

export interface IActiveShifts {
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
