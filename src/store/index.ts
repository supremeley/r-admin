import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';

import authReducer from './auth';
import sysReducer from './sys';

const encryptor = encryptTransform({
  secretKey: 'test@key12',
});

const authPersistConfig = {
  key: 'auth',
  storage,
  // whitelist: ['counter'],
  transforms: [encryptor],
};

const authPersistedReducer = persistReducer(authPersistConfig, authReducer);

const reducers = combineReducers({
  sys: sysReducer,
  auth: authPersistedReducer,
});

export const store = configureStore({
  reducer: reducers,
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
