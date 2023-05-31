import { Profile } from '@entities/profile';

export interface JobPaymentRequest {
  jobId: number;
  clientProfile: Profile;
}
