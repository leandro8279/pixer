export interface LoginInput {
  email: string;
  password: string;
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
