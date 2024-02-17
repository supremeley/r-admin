export interface LoginParams {
  username: string;
  password: string;
}

export interface Auth {
  token: string;
  userinfo: Userinfo;
}

export interface Userinfo {
  id: number;
  username: string;
  mobile: number;
  gender: number;
  type: number;
  status: boolean;
  avatar?: string;
}

export type LoginResponse = Auth;
