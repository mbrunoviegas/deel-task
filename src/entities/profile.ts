import { ProfileType } from './enum/profile-type';

export class Profile {
  id: number;

  firstName: string;

  lastName: string;

  profession: string;

  balance: number;

  type: ProfileType;
  
  createdAt: Date;

  updatedAt: Date;
}
