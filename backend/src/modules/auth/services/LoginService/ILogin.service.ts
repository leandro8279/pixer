import { LoginRequestDTO, LoginResponseDTO } from '@/modules/auth/dto';

export const LOGIN_SERVICE = Symbol('ILoginService');

export interface ILoginService {
  execute(params: LoginRequestDTO): Promise<LoginResponseDTO>;
}

export namespace ILoginService {
  export type Params = LoginRequestDTO;
  export type Result = LoginResponseDTO;
}
