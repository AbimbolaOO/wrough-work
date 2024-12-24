import { ILocumJobs } from './getLocumJobs.model';

export interface IBookmarkLocumJobs {
  createdAt: string;
  id: string;
  job: ILocumJobs;
  userId: string;
}
