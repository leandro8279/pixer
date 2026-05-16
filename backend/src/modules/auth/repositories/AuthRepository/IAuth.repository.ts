import { User } from '@/modules/auth/entities/User';

export const AUTH_REPOSITORY = Symbol('IAuthRepository');

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export interface IAuthRepository {
  createWallet(userId: string): Promise<void>;
  assignRoleToUser(userId: string, roleName: string): Promise<void>;
  assignPermissionToUser(userId: string, permissionName: string): Promise<void>;
  createUser(params: CreateUserData): Promise<User>;
  getUserRole(id: string): Promise<string | null>;
  getUserPermissions(id: string): Promise<string[]>;
  findUserByEmail(email: string): Promise<User | null>;
  findActiveUserByEmail(email: string): Promise<User | null>;
  findUserWithRelationsById(id: string): Promise<User | null>;
}
