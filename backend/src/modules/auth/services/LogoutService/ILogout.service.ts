export const LOGOUT_SERVICE = Symbol('ILogoutService');

export interface ILogoutService {
  execute(params: ILogoutService.Params): Promise<ILogoutService.Result>;
}

export namespace ILogoutService {
  export type Params = { token: string };
  export type Result = { message: string };
}
