import { Profile } from '@entities/profile';

export interface GetContractByIdRequest {
  contractId: number;
  profile: Profile;
}
