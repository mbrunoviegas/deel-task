import { Profile } from '@entities/profile';

export interface Request { 
  body: Record<string, unknown>;
  params: Record<string, unknown>;
  query: Record<string, unknown>;
  headers: Record<string, unknown>;
  profile: Profile;
}
