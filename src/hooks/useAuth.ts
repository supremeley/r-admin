import { useState } from 'react';

import { login } from '@/api/sys/auth';
import type { LoginParams } from '@/api/sys/type';
import { store } from '@/store';
import { saveToken, saveUserinfo } from '@/store/auth';

export function getToken() {
  const auth = store.getState().auth;

  const { token } = auth;

  return [token];
}

export const useLogin = async (params: LoginParams) => {
  const [result, setResult] = useState({});

  const { code, data } = await login(params);

  if (code !== 200) {
    return [false];
  } else {
    const { token, userinfo } = data;

    store.dispatch(saveUserinfo(userinfo));
    store.dispatch(saveToken(token));

    setResult(data);

    return [result, setResult];
  }
};

// export function getAuthCache<T>(key: BasicKeys) {
//   const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
//   return fn(key) as T;
// }

// export function setAuthCache(key: BasicKeys, value) {
//   const fn = isLocal ? Persistent.setLocal : Persistent.setSession;
//   return fn(key, value, true);
// }

// export function clearAuthCache(immediate = true) {
//   const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession;
//   return fn(immediate);
// }
