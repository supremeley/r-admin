import { Message, Notification } from '@arco-design/web-react';
import { useState } from 'react';

// import { history } from 'react-router-dom';
import { sys } from '@/api';
import type { Auth, LoginParams } from '@/api/sys/interface';
import { ResultEnum } from '@/enums/http';
import { store } from '@/store';
import { setToken, setUserinfo } from '@/store/auth';

export const useAuth = (): [
  {
    login: (params: LoginParams) => Promise<void>;
    logout: () => void;
    loading: boolean;
  },
  Auth,
] => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState<Auth | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (params: LoginParams) => {
    setLoading(true);

    const { code, result, message } = await sys.login(params);

    if (code === ResultEnum.SUCCESS) {
      const { token, userinfo } = result;

      setAuth(result);

      store.dispatch(setUserinfo(userinfo));
      store.dispatch(setToken(token));

      Message.success({
        content: '登录成功',
        duration: 1000,
        onClose: () => {
          setLoading(false);

          navigate('/home', { replace: true });

          const hour = new Date().getHours();

          const thisTime =
            hour < 8 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 18 ? '下午好' : '晚上好';

          Notification.success({
            title: `${userinfo.username},欢迎登录`,
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

export function getToken() {
  const auth = store.getState().auth;

  const { token } = auth;

  return [token];
}

export const JumpToLogin = () => {
  console.log('jumpToLogin');
  const navigate = useNavigate();
  console.log('navigate');

  store.dispatch(setUserinfo(null));
  store.dispatch(setToken(null));

  navigate('/login', { replace: true });
};
