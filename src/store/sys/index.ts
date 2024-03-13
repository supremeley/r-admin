import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// import type { AuthRoute } from '@/api/sys/interface';
// import { dynamicsRoutes } from '@/constants';
// import { transfrom2Menu } from '@/utils';
// import type { AuthRoute } from '@/api/sys/interface';
import type { MenuItem, SySState } from './interface';

const initialState: SySState = {
  // menu: transfrom2Menu(dynamicsRoutes as AuthRoute[]),
  // routes: dynamicsRoutes,
  menu: [],
  routes: [],
  history: [],
};

export const systemSlice = createSlice({
  name: 'sys',
  initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<MenuItem[]>) => {
      state.menu = action.payload;
    },
    setRoutes: (state, action: PayloadAction<RouteWithMetaObject[]>) => {
      state.routes = action.payload;
    },
    setHistory: (state, action: PayloadAction<[]>) => {
      state.history = action.payload;
    },
  },
});

export const { setMenu, setRoutes } = systemSlice.actions;

export default systemSlice.reducer;
