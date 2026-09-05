import { CONSULTING_VENDOR } from '@/vendors/vendor.types';
import { IDialogParams } from './dialog.interfaces';
import { IOrganizableInfo, IUserInfo, TUserRole } from './user.interfaces';

/**
 * Toast notify 함수 타입
 */
export type TToastNotify = (params: {
  message: string;
  type: 'default' | 'success' | 'error' | 'warning' | 'info';
}) => void;

/**
 * Dialog 열기 함수 타입
 */
export type TOpenDialog = (params: Partial<IDialogParams>) => void;

export interface IHostProps {
  host_openDialog: TOpenDialog;
  host_openToast: TToastNotify;
  host_userInfo: IUserInfo;
  host_token: string;
  host_role: TUserRole;
  host_organizable: IOrganizableInfo;
  host_route: {
    push: (path: string) => Promise<void>;
    go: (num: number) => void;
    replace: (path: string) => Promise<void>;
  };
  vendor: CONSULTING_VENDOR;
}
