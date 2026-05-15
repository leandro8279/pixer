export enum ShippingType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
  FREE_SHIPPING = 'free_shipping',
}

export enum CouponType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
  FREE_SHIPPING = 'free_shipping',
  DEFAULT_COUPON = 'default_coupon',
}

export enum ProductStatus {
  DRAFT = 'draft',
  PUBLISH = 'publish',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  UNDER_REVIEW = 'under_review',
  OUT_OF_STOCK = 'out_of_stock',
  UNPUBLISH = 'unpublish',
}

export enum ProductType {
  SIMPLE = 'simple',
  VARIABLE = 'variable',
}

export enum ProductVisibilityStatus {
  VISIBILITY_PUBLIC = 'visibility_public',
  CATALOG = 'catalog',
  SEARCH = 'search',
}

export enum OrderStatus {
  ORDER_RECEIVED = 'order_received',
  ORDER_PROCESSING = 'order_processing',
  ORDER_AT_LOCAL_FACILITY = 'order_at_local_facility',
  ORDER_OUT_FOR_DELIVERY = 'order_out_for_delivery',
  ORDER_COMPLETED = 'order_completed',
  ORDER_CANCELLED = 'order_cancelled',
  ORDER_REFUNDED = 'order_refunded',
  ORDER_FAILED = 'order_failed',
  ORDER_RETURNED = 'order_returned',
}

export enum PaymentStatus {
  PAYMENT_PENDING = 'payment_pending',
  PAYMENT_PROCESSING = 'payment_processing',
  PAYMENT_SUCCESS = 'payment_success',
  PAYMENT_FAILED = 'payment_failed',
  PAYMENT_REVERSAL = 'payment_reversal',
  PAYMENT_CASH_ON_DELIVERY = 'payment_cash_on_delivery',
  WALLET = 'wallet',
  PAYMENT_AWAITING_FOR_APPROVAL = 'payment_awaiting_for_approval',
  CASH_ON_DELIVERY = 'cash_on_delivery',
}

export enum WithdrawStatus {
  APPROVED = 'approved',
  PENDING = 'pending',
  ON_HOLD = 'on_hold',
  REJECTED = 'rejected',
  PROCESSING = 'processing',
}

export enum RefundStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum RefundPolicyTarget {
  VENDOR = 'vendor',
  CUSTOMER = 'customer',
}

export enum RefundPolicyStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum FlashSaleType {
  DEFAULT = 'default',
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
}

export enum StoreNoticePriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum StoreNoticeType {
  ALL_VENDOR = 'all_vendor',
  SPECIFIC_VENDOR = 'specific_vendor',
  ALL_SHOP = 'all_shop',
  SPECIFIC_SHOP = 'specific_shop',
}

export enum ResourceType {
  PERSON = 'person',
  PICKUP = 'pickup',
  DROPOFF = 'dropoff',
  FEATURE = 'feature',
  DEPOSIT = 'deposit',
}

export enum DefaultStatusType {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum ParticipantType {
  SHOP = 'shop',
  USER = 'user',
}
