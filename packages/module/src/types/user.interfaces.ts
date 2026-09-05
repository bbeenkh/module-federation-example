export interface IUserInfo {
  email: string;
  id: number;
  name: string;
  phone: string;
  role: string;
  organizable_name: string;
  organizable_id: number;
  code: string;
}

export interface IOrganizableInfo {
  id: number;
  name: string;
  code: string;
}

export type TUserRole =
  | 'hub'
  | 'store'
  | 'store-m'
  | 'distributor'
  | 'distributor-m';
