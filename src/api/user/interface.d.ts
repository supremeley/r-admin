export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userinfo: {
    username: string;
    userID: string;
  };
}
