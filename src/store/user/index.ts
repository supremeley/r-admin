import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { UserInfo, UserState } from './user.type';

const initialState: UserState = {
  userinfo: null,
  token: null,
};

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserinfo: (state, action: PayloadAction<UserInfo>) => {
      state.userinfo = action.payload;
    },
  },
});

export const { saveUserinfo } = counterSlice.actions;

export default counterSlice.reducer;
