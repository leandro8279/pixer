export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string | null;
  permissions: string[];
  email_verified: boolean;
  role: string | null;
}

export type UserPermission = 'super_admin' | 'store_owner' | 'staff' | 'customer';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  permission?: UserPermission;
}

export interface RegisterResponse {
  token: string;
  permissions: string[];
  role: string;
}

export enum OwnerShipTransferStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum Permission {
  SuperAdmin = 'super_admin',
  StoreOwner = 'store_owner',
  Staff = 'staff',
  Customer = 'customer',
}
