import { StatusToastAttributes } from '../../components/StatusToast/StatusToast.types';

export type ToastContextType = {
  showToast: ({ title, message, type }: StatusToastAttributes) => void;
};

export type ToastProviderProps = {
  children: React.ReactNode;
};
