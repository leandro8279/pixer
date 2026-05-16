import { UserResponseDTO } from '@/modules/auth/dto';

export const ME_SERVICE = Symbol('IMeService');

export interface IMeService {
  execute(params: IMeService.Params): Promise<IMeService.Result>;
}

export namespace IMeService {
  export type Params = string;
  export type Result = UserResponseDTO;
}
