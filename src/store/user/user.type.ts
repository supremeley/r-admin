export interface UserInfo {
  username: string;
  userID: string;
}

export interface UserState {
  userinfo: UserInfo | null;
  token: string | null;
}
