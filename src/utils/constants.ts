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

export const ACCEPTED_FILE_TYPES = {
  'image/jpeg': [],
  'image/png': [],
  'application/pdf': [],
  'application/zip': [],
  'application/vnd.rar': [],
  'application/epub+zip': [],
  '.psd': [],
};

export const phoneRegExp = /^\+?((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const URLRegExp =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

export const searchModalInitialValues = false;
export const miniSidebarInitialValue = false;
export const checkIsMaintenanceModeComing = false;
export const checkIsMaintenanceModeStart = false;
export const approveModalInitialValues = false;
export const OWNERSHIP_TRANSFER_STATUS = [OwnerShipTransferStatus['PENDING'], OwnerShipTransferStatus['PROCESSING']];
