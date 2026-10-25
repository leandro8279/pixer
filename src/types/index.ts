export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
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

export interface LoginResponse {
  token: string | null;
  permissions: string[];
  // email_verified: boolean;
  role: string | null;
}

export interface SearchParamOptions {
  categories: string;
  code: string;
  type: string;
  name: string;
  shop_id: string;
  is_approved: boolean;
  tracking_number: string;
  notice: string;
  notify_type: string;
  faq_title: string;
  is_active: boolean;
  title: string;
  status: string;
  user_id: string;
  target: string;
  refund_reason: string;
  shops: string;
  'users.id': string;
  product_type: string;
  is_read: boolean;
  transaction_identifier: string;
}

export interface NotifyLogs {
  id: string;
  receiver: string;
  sender: string;
  notify_type: string;
  notify_receiver_type: string;
  is_read: boolean;
  notify_text: string;
}

export interface NotifyLogsQueryOptions extends QueryOptions {
  notify_type: string;
  notify_receiver_type?: string;
  sender?: string;
  receiver: string;
  set_all_read?: boolean;
  is_read?: boolean;
}

export interface ProductTypeOptions {
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  translated_languages: string[];
  parent?: number;
  children: Category[];
  details?: string;
  image?: Attachment;
  icon?: string;
  type: Type;
  products: Product[];
  created_at: string;
  updated_at: string;
}

export interface Author {
  bio?: string;
  born?: string;
  translated_languages: string[];
  cover_image?: Attachment;
  death?: string;
  id: string;
  image?: Attachment;
  is_approved?: boolean;
  language?: string;
  name: string;
  quote?: string;
  slug?: string;
  socials?: ShopSocials[];
  created_at?: string;
  updated_at?: string;
}
export interface AuthorQueryOptions extends QueryOptions {
  type: string;
  name: string;
  is_approved?: boolean;
}

export interface Manufacturer {
  cover_image?: Attachment;
  created_at?: string;
  description?: string;
  translated_languages: string[];
  id: string;
  image?: Attachment;
  is_approved?: boolean;
  name: string;
  slug?: string;
  socials?: ShopSocials[];
  type: Type;
  type_id?: string;
  updated_at?: string;
  website?: string;
}

export interface ManufacturerQueryOptions extends QueryOptions {
  shop_id: string;
  name: string;
  is_approved: boolean;
  type: string;
}

export interface ManufacturerPaginator extends PaginatorInfo<Manufacturer> {}
export interface AuthorPaginator extends PaginatorInfo<Author> {}
export interface TagPaginator extends PaginatorInfo<Tag> {}
export interface TagQueryOptions extends QueryOptions {
  type: string;
  name: string;
  parent: number | null;
}
export interface Tag {
  id: string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  translated_languages: string[];
  icon?: string;
  // type: Type;
  products?: Product[];
  created_at?: string;
  updated_at?: string;
}

export interface TaxQueryOptions extends QueryOptions {
  name: string;
}

export interface Tax {
  id?: string;
  name?: string;
  rate?: number;
}

export interface CategoryPaginator extends PaginatorInfo<Category> {}

export interface CategoryQueryOptions extends QueryOptions {
  type: string;
  name: string;
  parent: number | null;
  self: string;
}
export interface NotifyLogsPaginator extends PaginatorInfo<NotifyLogs> {}

export interface User {
  id: string;
  name: string;
  shops: Shop[];
  managed_shop: Shop;
  is_active: boolean;
  email: string;
  created_at: string;
  updated_at: string;
  profile?: Profile;
  address: Address[];
  orders?: OrderPaginator;
  email_verified: boolean;
}

export interface AuthResponse {
  token: string;
  permissions: string[];
  role: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
  shop_id?: number;
  // permission: Permission;
}

export interface UpdateUser {
  name?: string;
  profile?: UserProfileInput;
  address?: UserAddressUpsertInput[];
}

export interface ChangePasswordInput {
  oldPassword: string;
  newPassword: string;
}

export interface ForgetPasswordInput {
  email: string;
}

export interface VerifyForgetPasswordTokenInput {
  token: string;
  email: string;
}

export interface ResetPasswordInput {
  token: string;
  email: string;
  password: string;
}

export declare interface MakeAdminInput {
  user_id: string;
}

export interface BlockUserInput {
  id: number;
}

export interface WalletPointsInput {
  customer_id: string;
  points: number;
}
export interface KeyInput {
  license_key: string;
}

export declare type AddStaffInput = {
  email: string;
  password: string;
  name: string;
  shop_id: number;
};

export declare type ApproveShopInput = {
  id: string;
  admin_commission_rate: number;
  isCustomCommission: boolean;
};

export interface KeyInput {
  license_key: string;
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export interface UserAddress {
  country?: string;
  city?: string;
  state?: string;
  zip?: string;
  street_address?: string;
}

export interface QueryOptions {
  language: string;
  limit?: number;
  page?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
}

export interface UserQueryOptions extends QueryOptions {
  name: string;
  search?: string;
  is_active?: boolean;
  shop_id: string | number;
  exclude: string | number;
}

export interface PaginatorInfo<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface UserPaginator extends PaginatorInfo<User> {}

export interface SettingsOptions {
  siteTitle?: string;
  siteSubtitle?: string;
  currency?: string;
  defaultAi?: string;
  paymentGateway?: any;
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
  id: number;
  options: SettingsOptions;
  language: string;
  created_at: string;
  updated_at: string;
}

export interface SettingsOptionsInput {
  siteTitle?: string;
  siteSubtitle?: string;
  currency?: string;
  useOtp?: boolean;
  useAi?: boolean;
  defaultAi?: any;
  freeShipping?: boolean;
  useCashOnDelivery?: boolean;
  paymentGateway?: any;
  defaultPaymentGateway?: string;
  contactDetails?: ContactDetailsInput;
  minimumOrderAmount?: number;
  freeShippingAmount?: number;
  currencyToWalletRatio?: number;
  signupPoints?: number;
  maxShopDistance?: number;
  maximumQuestionLimit?: number;
  deliveryTime?: DeliveryTimeInput[];
  logo?: AttachmentInput;
  taxClass?: string;
  shippingClass?: string;
  seo?: SeoSettingsInput;
  google?: GoogleSettingsInput;
  facebook?: FacebookSettingsInput;
  currencyOptions?: SettingCurrencyOptions;
  useEnableGateway?: boolean;
  guestCheckout?: boolean;
  smsEvent?: SmsEvent;
  emailEvent?: EmailEvent;
  pushNotification?: PushNotification;
  server_info?: ServerInfo;
  useGoogleMap?: boolean;
  enableTerms?: boolean;
  enableCoupons?: boolean;
  isProductReview?: boolean;
  enableEmailForDigitalProduct?: boolean;
  isPromoPopUp?: boolean;
  promoPopup?: PromoPopupFormValues;
  enableReviewPopup?: boolean;
  reviewSystem?: string;
}

export interface SettingsInput {
  language?: string;
  options?: SettingsOptionsInput;
}

export interface TodayTotalOrderByStatus {
  pending: number;
  processing: number;
  complete: number;
  cancelled: number;
  refunded: number;
  failed: number;
  localFacility: number;
  outForDelivery: number;
}

export interface Order {
  id: string;
  tracking_number: string;
  customer_contact: string;
  customer_name: string;
  customer_id: number;
  customer?: User;
  amount: number;
  sales_tax: number;
  total: number;
  paid_total: number;
  payment_id?: string;
  parent_id: string | null;
  payment_gateway?: string;
  coupon?: Coupon;
  discount?: number;
  wallet_point?: WalletPoint;
  delivery_fee?: number;
  delivery_time: string;
  products: Product[];
  created_at: string;
  updated_at: string;
  billing_address?: UserAddress;
  shipping_address?: UserAddress;
  translated_languages: string[];
  language: string;
  order_status: string;
  payment_status: string;
  shop_id?: string;
  shop?: Shop;
  note?: string;
}

export interface Withdraw {
  id?: string;
  amount?: number;
  status?: WithdrawStatus;
  shop_id?: number;
  shop?: Shop;
  payment_method?: string;
  details?: string;
  note?: string;
  created_at?: string;
  updated_at?: string;
}

export interface FAQs {
  id: string;
  translated_languages: string[];
  language: string;
  faq_title: string;
  slug: string;
  faq_description: string;
  shop_id?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface FAQsQueryOptions extends QueryOptions {
  faq_title: string;
  shop_id: string;
}

export interface TermsAndConditions {
  id: string;
  translated_languages: string[];
  language: string;
  title: string;
  slug: string;
  description: string;
  shop_id?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  is_approved?: boolean;
}

export interface TermsAndConditionsQueryOptions extends QueryOptions {
  title: string;
  shop_id: string;
  is_approved?: boolean;
}

export interface TermsAndConditionsPaginator extends PaginatorInfo<TermsAndConditions> {}

export interface FAQsPaginator extends PaginatorInfo<FAQs> {}

export interface MappedPaginatorInfo {
  currentPage: number;
  firstPageUrl: string;
  from: number;
  lastPage: number;
  lastPageUrl: string;
  links: any[];
  nextPageUrl: string | null;
  path: string;
  perPage: number;
  prevPageUrl: string | null;
  to: number;
  total: number;
  hasMorePages: boolean;
}
export enum ProductType {
  Simple = 'simple',
  Variable = 'variable',
}

export interface Shop {
  id?: string;
  owner_id?: number;
  owner?: User;
  staffs?: User[];
  is_active?: boolean;
  orders_count?: number;
  products_count?: number;
  balance?: Balance;
  name?: string;
  slug?: string;
  description?: string;
  cover_image: IImage;
  logo: IImage;
  address?: UserAddress;
  settings?: ShopSettings;
  created_at?: string;
  updated_at?: string;
  ownership_history?: {
    status: OwnerShipTransferStatus;
  };
}

export interface WithdrawQueryOptions extends Omit<QueryOptions, 'language'> {
  name: string;
  shop_id: string;
  parent: number | null;
}

export interface WithdrawPaginator extends PaginatorInfo<Withdraw> {}

export interface Product {
  id: string;
  translated_languages: string[];
  shop_id: string;
  actual_rating: number;
  type_slug: string;
  name: string;
  slug: string;
  type: Type;
  product_type: ProductType;
  max_price?: number;
  min_price?: number;
  categories: Category[];
  variations?: AttributeValue[];
  variation_options?: Variation[];
  digital_file?: DigitalFile;
  pivot?: OrderProductPivot;
  orders: Order[];
  description?: string;
  in_stock?: boolean;
  is_digital?: boolean;
  is_external?: boolean;
  is_taxable?: boolean;
  sale_price?: number;
  video?: {
    url: string;
  }[];
  sku?: string;
  gallery?: Attachment[];
  image?: Attachment;
  status?: ProductStatus;
  height?: string;
  length?: string;
  width?: string;
  price: number;
  quantity?: number;
  unit?: string;
  external_product_url?: string;
  external_product_button_text?: string;
  created_at: string;
  updated_at: string;
  ratings: number;
  shop?: Shop;
}

export interface Attachment {
  thumbnail: string;
  original: string;
  id?: string;
}

export enum OwnerShipTransferStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface ProductPaginator extends PaginatorInfo<Product> {}

export interface ProductQueryOptions extends QueryOptions {
  type: string;
  name: string;
  categories: string;
  tags: string;
  author: string;
  price: string;
  manufacturer: string;
  status: string;
  is_active: string;
  shop_id: string;
  min_price: string;
  max_price: string;
  rating: string;
  question: string;
  user_id: string;
  flash_sale_builder: boolean;
  product_type: string;
  searchedByUser: string;
}

export enum OrderStatus {
  PENDING = 'order-pending',
  PROCESSING = 'order-processing',
  COMPLETED = 'order-completed',
  CANCELLED = 'order-cancelled',
  REFUNDED = 'order-refunded',
  FAILED = 'order-failed',
  AT_LOCAL_FACILITY = 'order-at-local-facility',
  OUT_FOR_DELIVERY = 'order-out-for-delivery',
}

export interface OrderPaginator extends PaginatorInfo<Order> {}

export interface OrderQueryOptions extends QueryOptions {
  type: string;
  name: string;
  shop_id: string;
  tracking_number: string;
  refund_reason: string;
  with: string;
}

export interface GenerateInvoiceDownloadUrlInput {
  order_id: string;
  translated_text?: InvoiceTranslatedText;
  is_rtl: boolean;
}

export interface TypeQueryOptions extends QueryOptions {
  name?: string;
}

export interface GetParams {
  slug: string;
  language: string;
}

export interface Type {
  id: string;
  name: string;
  icon: string;
  slug: string;
  promotional_sliders?: AttachmentInput;
  settings?: TypeSettings;
  products?: ProductPaginator;
  created_at: string;
  updated_at: string;
  translated_languages: string[];
}

export interface ShopQueryOptions extends Omit<QueryOptions, 'language'> {
  name: string;
  parent: number | null;
  is_active?: boolean;
}

export interface ShopPaginator extends PaginatorInfo<Shop> {}

export interface PaymentInfoInput {
  account: number;
  name: string;
  email: string;
  bank: string;
}

export interface IImage {
  __typename?: string;
  id: string;
  thumbnail: string;
  original: string;
}

export interface ShopInput {
  name: string;
  description?: string;
  cover_image?: AttachmentInput;
  logo?: AttachmentInput;
  address?: UserAddressInput;
  settings?: ShopSettingsInput;
  categories?: Category[];
  balance?: BalanceInput;
}

export interface BalanceInput {
  id?: string;
  payment_info: PaymentInfoInput;
}

export interface ShopSocials {
  icon?: string;
  url?: string;
}

export declare type UserAddressInput = {
  country?: string;
  city?: string;
  state?: string;
  zip?: string;
  street_address?: string;
};

export interface shopMaintenance {
  image: Attachment;
  title: string;
  description: string;
  start: Date;
  until: Date;
}

export interface ShopSettings {
  socials?: ShopSocials[];
  contact: string;
  location: Location;
  website: string;
  notifications: {
    email: string;
    enable: boolean;
  };
  askForAQuote: {
    enable: boolean;
    content: string;
    quote: string;
  };
  isShopUnderMaintenance?: string;
  shopMaintenance: shopMaintenance;
}

export interface GoogleMapLocation {
  lat?: number | string;
  lng?: number | string;
  street_number?: string;
  route?: string;
  street_address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  formattedAddress?: string;
  formatted_address?: string;
}

export interface ShopSocialInput {
  icon?: string;
  url?: string;
}
