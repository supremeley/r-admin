import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { AuthState, UserInfo } from './interface';

const initialState: AuthState = {
  userinfo: {
    userID: '123',
    username: 'ray',
  },
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUserinfo: (state, action: PayloadAction<UserInfo>) => {
      state.userinfo = action.payload;
    },
    saveToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { saveUserinfo, saveToken } = authSlice.actions;

export default authSlice.reducer;
