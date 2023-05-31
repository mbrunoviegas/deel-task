import { Profile } from '@entities/profile';

declare global {
  namespace Express {
    interface Request {
      profile: Profile;
    }
  }
}
