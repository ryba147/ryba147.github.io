import { User } from '@app/models/user';

export interface AuthDetails {
  authHeader: string;
  userData: User;
}
