import * as Yup from 'yup';

export interface IGetJobApplicationStats {
  SUBMITTED: number;
  SCREENING: number;
  INTERVIEW: number;
  REJECTED: number;
  ACCEPTED: number;
}
