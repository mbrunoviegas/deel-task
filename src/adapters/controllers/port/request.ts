import { Profile } from '@entities/profile';

export interface Request<T = object> { 
  body: T;
  params: Record<string, unknown>;
  query: Record<string, unknown>;
  headers: Record<string, unknown>;
  profile: Profile;
}
