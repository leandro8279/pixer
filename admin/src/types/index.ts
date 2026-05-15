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

export interface SettingsOptions {
  siteTitle?: string;
  siteSubtitle?: string;
  currency?: string;
  defaultAi?: string;
  paymentGateway?: string;
  defaultPaymentGateway?: string;
  useOtp?: boolean;
  useAi?: boolean;
  contactDetails?: ContactDetails;
  minimumOrderAmount?: number;
  currencyToWalletRatio?: number;
  signupPoints?: number;
  maxShopDistance?: number;
  maximumQuestionLimit?: number;
  deliveryTime?: DeliveryTime[];
  logo?: Attachment;
  collapseLogo?: Attachment;
  taxClass?: string;
  shippingClass?: string;
  seo?: SeoSettings;
  google?: GoogleSettings;
  facebook?: FacebookSettings;
  useEnableGateway?: boolean;
  currencyOptions?: SettingCurrencyOptions;
  guestCheckout: boolean;
  smsEvent?: SmsEvent;
  emailEvent?: EmailEvent;
  server_info?: ServerInfo;
  useGoogleMap?: boolean;
  isProductReview?: boolean;
  freeShipping?: boolean;
  freeShippingAmount?: number;
  pushNotification?: PushNotification;
  enableTerms?: boolean;
  enableCoupons?: boolean;
  maintenance: Maintenance;
  isUnderMaintenance: boolean;
  enableEmailForDigitalProduct?: boolean;
  isPromoPopUp?: boolean;
  promoPopup?: PromoPopupFormValues;
  reviewSystem?: string;
  isMultiCommissionRate?: boolean;
}

export interface Settings {
  id: string;
  options: SettingsOptions;
  language: string;
  created_at: string;
  updated_at: string;
}
