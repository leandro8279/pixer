import { Role } from '@/modules/auth/entities/Role';
import { User } from '@/modules/auth/entities/User';
import { Wallet } from '@/modules/auth/entities/Wallet';

export const AUTH_REPOSITORY = Symbol('IAuthRepository');

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export type UserWithRelations = User & {
  wallet: Wallet | null;
  roles: Role[];
};

export interface IAuthRepository {
  createWallet(userId: string): Promise<void>;
  assignRoleToUser(userId: string, roleName: string): Promise<void>;
  assignPermissionToUser(userId: string, permissionName: string): Promise<void>;
  createUser(params: CreateUserData): Promise<User>;
  getUserRole(id: string): Promise<string | null>;
  getUserPermissions(id: string): Promise<string[]>;
  findUserByEmail(email: string): Promise<User | null>;
  findActiveUserByEmail(email: string): Promise<User | null>;
  findUserWithRelationsById(id: string): Promise<UserWithRelations | null>;
  isTokenRevoked(tokenHash: string): Promise<boolean>;
}
