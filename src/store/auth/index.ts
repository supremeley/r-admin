import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { AuthState, UserInfo } from './interface';

const initialState: AuthState = {
  userinfo: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserinfo: (state, action: PayloadAction<UserInfo | null>) => {
      state.userinfo = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.userinfo = null;
      state.token = null;
    },
  },
});

export const { setUserinfo, setToken } = authSlice.actions;

export default authSlice.reducer;
