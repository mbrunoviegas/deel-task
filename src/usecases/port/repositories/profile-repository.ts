import { Profile } from '@entities/profile';

export interface GetBestProfessionOptions {
  startDate: Date;
  endDate: Date;
}

export interface GetBestClientOptions {
  startDate: Date;
  endDate: Date;
  limit: number;
}

export interface BestClientDetails {
  id: number;
  firstName: string;
  lastName: string;
  totalPaid: number;
}

export interface ProfileRepository {
  getProfileById(profileId: number): Promise<Profile>;
  getBestProfession(options: GetBestProfessionOptions): Promise<string>;
  getBestClients(options: GetBestClientOptions): Promise<BestClientDetails[]>;
}
