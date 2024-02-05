import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Menu, SySState } from './interface';

const initialState: SySState = {
  menu: [],
  history: [],
};

export const systemSlice = createSlice({
  name: 'sys',
  initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<Menu[]>) => {
      state.menu = action.payload;
    },
    // saveToken: (state, action: PayloadAction<string>) => {
    //   state.token = action.payload;
    // },
  },
});

export const { setMenu } = systemSlice.actions;

export default systemSlice.reducer;
