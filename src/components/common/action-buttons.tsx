interface Props {
  id: string;
  editModalView?: string | any;
  deleteModalView?: string | any;
  editUrl?: string;
  previewUrl?: string;
  enablePreviewMode?: boolean;
  detailsUrl?: string;
  isUserActive?: boolean;
  userStatus?: boolean;
  isShopActive?: boolean;
  approveButton?: boolean;
  termApproveButton?: boolean;
  couponApproveButton?: boolean;
  showAddWalletPoints?: boolean;
  changeRefundStatus?: boolean;
  showMakeAdminButton?: boolean;
  showReplyQuestion?: boolean;
  customLocale?: string;
  isTermsApproved?: boolean;
  isCouponApprove?: boolean;
  flashSaleVendorRequestApproveButton?: boolean;
  isFlashSaleVendorRequestApproved?: boolean;
  transferShopOwnership?: boolean;
  data?: { [key: string]: string | boolean | number };
  disabled?: boolean;
}

export function ActionButtons(props: Props) {
  const {} = props;
  return <div>ActionButtons</div>;
}
