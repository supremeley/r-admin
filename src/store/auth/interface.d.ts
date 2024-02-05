export interface UserInfo {
  username: string;
  userID: string;
}

export interface AuthState {
  userinfo: UserInfo | null;
  token: string | null;
}
