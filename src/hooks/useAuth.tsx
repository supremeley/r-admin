import { Message, Notification } from '@arco-design/web-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { auth as authApi } from '@/api';
import type { Auth, LoginParams } from '@/api/auth/interface';
import type { AuthRoute } from '@/api/sys/interface';
import { dynamicsRoutes } from '@/constants';
import { ResultEnum } from '@/enums';
import { store } from '@/store';
import { setToken, setUserinfo } from '@/store/auth';
import { setMenu, setRoutes } from '@/store/sys';
import { transfrom2Menu } from '@/utils';

export const useAuth = (): [
  {
    login: (params: LoginParams) => Promise<void>;
    logout: () => void;
    loading: boolean;
  },
  Auth,
] => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [auth, setAuth] = useState<Auth | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (params: LoginParams) => {
    setLoading(true);

    const { code, result, message } = await authApi.login(params);

    if (code === ResultEnum.SUCCESS) {
      const { token, userinfo } = result;
      setAuth(result);
      dispatch(setUserinfo(userinfo));
      dispatch(setToken(token));
      dispatch(setRoutes(dynamicsRoutes));
      dispatch(setMenu(transfrom2Menu(dynamicsRoutes as AuthRoute[])));

      Message.success({
        content: '登录成功',
        duration: 1000,
        onClose: () => {
          setLoading(false);

          // setTimeout(() => {
          navigate('/home', { replace: true });
          // }, 1000);

          const hour = new Date().getHours();

          const thisTime =
            hour < 8 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 18 ? '下午好' : '晚上好';

          Notification.success({
            title: `${userinfo.username || '您好'},欢迎登录`,
            content: thisTime,
          });
        },
      });
    } else {
      Message.error(message);
    }
  };

  const logout = () => {
    store.dispatch(setUserinfo(null));
    store.dispatch(setToken(null));

    navigate('/login', { replace: true });
  };

  return [{ login, logout, loading }, auth!];
};
