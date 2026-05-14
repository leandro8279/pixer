import { OwnerShipTransferStatus } from '@/types';

export const LIMIT = 10;
export const SUPER_ADMIN = 'super_admin';
export const STORE_OWNER = 'store_owner';
export const STAFF = 'staff';
export const TOKEN = 'token';
export const PERMISSIONS = 'permissions';
export const AUTH_CRED = 'AUTH_CRED';
export const EMAIL_VERIFIED = 'emailVerified';
export const CART_KEY = 'pick-cart';
export const CHECKOUT = 'pickbazar-checkout';
export const RESPONSIVE_WIDTH = 1024 as number;
export const MAINTENANCE_DETAILS = 'MAINTENANCE_DETAILS';
export const MAXIMUM_WORD_COUNT_FOR_RICH_TEXT_EDITOR: number = 10000;
export const phoneRegExp =
  /^\+?((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const URLRegExp =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

export const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
// export const ACCEPTED_FILE_TYPES = "image/*,application/pdf,application/zip,application/vnd.rar,application/epub+zip,.psd"
// export const ACCEPTED_FILE_TYPES =
//   'image/*,application/pdf,application/zip,application/vnd.rar,application/epub+zip,.psd';

export const ACCEPTED_FILE_TYPES = {
  'image/jpeg': [],
  'image/png': [],
  'application/pdf': [],
  'application/zip': [],
  'application/vnd.rar': [],
  'application/epub+zip': [],
  '.psd': [],
};

export const OWNERSHIP_TRANSFER_STATUS = [OwnerShipTransferStatus['PENDING'], OwnerShipTransferStatus['PROCESSING']];

export const API_ENDPOINTS = {
  ATTACHMENTS: 'attachments',
  ANALYTICS: 'analytics',
  ATTRIBUTES: 'attributes',
  ATTRIBUTE_VALUES: 'attribute-values',
  ORDER_STATUS: 'order-status',
  ORDERS: 'orders',
  USERS: 'users',
  REGISTER: 'register',
  PRODUCTS: 'products',
  POPULAR_PRODUCTS: 'popular-products',
  COUPONS: 'coupons',
  VERIFY_COUPONS: 'coupons/verify',
  TAXES: 'taxes',
  SHIPPINGS: 'shippings',
  SETTINGS: 'settings',
  CATEGORIES: 'categories',
  TAGS: 'tags',
  TYPES: 'types',
  PROFILE_UPDATE: 'profile-update',
  LOGOUT: 'logout',
  ME: 'me',
  TOKEN: 'token',
  BLOCK_USER: 'users/block-user',
  UNBLOCK_USER: 'users/unblock-user',
  CHANGE_PASSWORD: 'change-password',
  FORGET_PASSWORD: 'forget-password',
  VERIFY_FORGET_PASSWORD_TOKEN: 'verify-forget-password-token',
  RESET_PASSWORD: 'reset-password',
  DOWNLOAD_INVOICE: 'download/invoice',
  APPROVE_SHOP: 'approve-shop',
  DISAPPROVE_SHOP: 'disapprove-shop',
  SHOPS: 'shops',
  MY_SHOPS: 'my-shops',
  WITHDRAWS: 'withdraws',
  APPROVE_WITHDRAW: 'approve-withdraw',
  ADD_WALLET_POINTS: 'add-points',
  ADD_LICENSE_KEY_VERIFY: 'license-key/verify',
  REFUNDS: 'refunds',
  STAFFS: 'staffs',
  ADD_STAFF: 'staffs',
  REMOVE_STAFF: 'staffs',
  IMPORT_PRODUCTS: 'import-products/',
  IMPORT_ATTRIBUTES: 'import-attributes/',
  IMPORT_VARIATION_OPTIONS: 'import-variation-options/',
  MAKE_ADMIN: 'users/make-admin',
  AUTHORS: 'authors',
  MANUFACTURERS: 'manufacturers',
  CHECKOUT: 'orders/checkout/verify',
  ORDER_SEEN: 'orders/seen',
  QUESTIONS: 'questions',
  REVIEWS: 'reviews',
  ABUSIVE_REPORTS_DECLINE: 'abusive_reports/reject',
  ABUSIVE_REPORTS: 'abusive_reports',
  GENERATE_DESCRIPTION: 'generate-descriptions',
  ORDER_EXPORT: 'export-order-url',
  ORDER_CREATE: 'order/create',
  ORDER_INVOICE_DOWNLOAD: 'download-invoice-url',
  SEND_VERIFICATION_EMAIL: '/email/verification-notification',
  UPDATE_EMAIL: '/update-email',
  CONVERSIONS: '/conversations',
  MESSAGE: '/messages/conversations',
  MESSAGE_SEEN: '/messages/seen',
  ADMIN_LIST: '/admin/list',
  STORE_NOTICES: 'store-notices',
  STORE_NOTICES_IS_READ: 'store-notices/read',
  STORE_NOTICE_GET_STORE_NOTICE_TYPE: 'store-notices/getStoreNoticeType',
  STORE_NOTICES_USER_OR_SHOP_LIST: 'store-notices/getUsersToNotify',
  NOTIFY_LOGS: 'notify-logs',
  FAQS: 'faqs',
  NEW_OR_INACTIVE_SHOPS: 'new-shops',
  TERMS_AND_CONDITIONS: 'terms-and-conditions',
  APPROVE_TERMS_AND_CONDITIONS: 'approve-terms-and-conditions',
  DISAPPROVE_TERMS_AND_CONDITIONS: 'disapprove-terms-and-conditions',
  LOW_STOCK_PRODUCTS_ANALYTICS: 'low-stock-products',
  NEW_OR_INACTIVE_PRODUCTS: 'draft-products',
  LOW_OR_OUT_OF_STOCK_PRODUCTS: 'products-stock',
  CATEGORY_WISE_PRODUCTS: 'category-wise-product',
  CATEGORY_WISE_PRODUCTS_SALE: 'category-wise-product-sale',
  VENDORS_LIST: '/vendors/list',
  CUSTOMERS: '/customers/list',
  FLASH_SALE: 'flash-sale',
  PRODUCT_FLASH_SALE_INFO: 'product-flash-sale-info',
  NOTIFY_LOG_SEEN: 'notify-log-seen',
  READ_ALL_NOTIFY_LOG: 'notify-log-read-all',
  REFUND_POLICIES: 'refund-policies',
  REFUND_REASONS: 'refund-reasons',
  PRODUCTS_BY_FLASH_SALE: 'products-by-flash-sale',
  TOP_RATED_PRODUCTS: 'top-rate-product',
  MY_STAFFS: '/my-staffs',
  ALL_STAFFS: '/all-staffs',
  APPROVE_COUPON: 'approve-coupon',
  DISAPPROVE_COUPON: 'disapprove-coupon',
  REQUEST_LISTS_FOR_FLASH_SALE: 'vendor-requests-for-flash-sale',
  REQUESTED_PRODUCTS_FOR_FLASH_SALE: 'requested-products-for-flash-sale',
  APPROVE_FLASH_SALE_REQUESTED_PRODUCTS: 'approve-flash-sale-requested-products',
  DISAPPROVE_FLASH_SALE_REQUESTED_PRODUCTS: 'disapprove-flash-sale-requested-products',
  BECAME_SELLER: 'became-seller',
  TRANSFER_SHOP_OWNERSHIP: 'transfer-shop-ownership',
  OWNERSHIP_TRANSFER: 'ownership-transfer',
};
