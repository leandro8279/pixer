import { RegisterRequestDTO, RegisterResponseDTO } from '@/modules/auth/dto';

export const REGISTER_SERVICE = Symbol('IRegisterService');

export interface IRegisterService {
  execute(params: IRegisterService.Params): Promise<IRegisterService.Result>;
}

export namespace IRegisterService {
  export type Params = RegisterRequestDTO;
  export type Result = RegisterResponseDTO;
}
