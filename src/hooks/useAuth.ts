// import { useDispatch } from 'react-redux';

// import type { RootState } from '@/store';
import { store } from '@/store';
import { saveToken, saveUserinfo } from '@/store/auth';
// import { CacheTypeEnum, TOKEN_KEY } from '@/enums/cacheEnum';
// import projectSetting from '@/settings/projectSetting';
// import { BasicKeys, Persistent } from '@/utils/cache/persistent';

// const { permissionCacheType } = projectSetting;
// const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;

export function useGetToken() {
  const auth = store.getState().auth;

  const { token } = auth;

  return [token];

  // return getAuthCache(TOKEN_KEY);
}

export function uselogin() {
  const userinfo = {
    username: '大哥',
    userID: '666',
  };
  const token = '1234';

  store.dispatch(saveUserinfo(userinfo));
  store.dispatch(saveToken(token));

  return [userinfo, token];
}

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
