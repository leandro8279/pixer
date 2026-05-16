import { User } from '@/modules/auth/entities/User';
import { UserResponseDTO } from '@/modules/auth/dto';

export const USER_FORMATTER = Symbol('IUserFormatter');

export interface IUserFormatter {
  format(params: IUserFormatter.Params): IUserFormatter.Result;
}

export namespace IUserFormatter {
  export interface Params {
    user: User;
    permissions: string[];
    role: string | null;
  }

  export type Result = UserResponseDTO;
}
