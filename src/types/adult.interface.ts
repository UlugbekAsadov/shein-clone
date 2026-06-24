export interface IAdultDict {
  badge: string;
  bannerText: string;
  confirm: string;
  modalTitle: string;
  modalDescription: string;
  decline: string;
  accept: string;
}

export interface IAdultDialogContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}
