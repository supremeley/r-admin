import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Menu, SySState } from './interface';

const initialState: SySState = {
  menu: [],
  history: [],
  routes: [],
};

export const systemSlice = createSlice({
  name: 'sys',
  initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<Menu[]>) => {
      state.menu = action.payload;
    },
    setHistory: (state, action: PayloadAction<[]>) => {
      state.history = action.payload;
    },
    setRoutes: (state, action: PayloadAction<[]>) => {
      state.routes = action.payload;
    },
  },
});

export const { setMenu, setHistory, setRoutes } = systemSlice.actions;

export default systemSlice.reducer;
