export interface UserInfo {
  id: number;
  username: string;
  mobile: number;
  gender: number;
  type: number;
  status: boolean;
  avatar?: string;
}

export interface AuthState {
  userinfo: UserInfo | null;
  token: string | null;
}
