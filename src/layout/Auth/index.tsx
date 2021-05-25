import { useEffect } from 'react';
import { message, Spin } from 'antd';
import { useUser } from '@/models';
import { HttpCode } from '@/constants';
import { history } from '@/utils';
import BasicLayout from '../BasicLayout';

/**
 * 登录校验
 * FIXME: 用useRecoilValueLoadable和React.Suspense重写这里的逻辑
 */
const Auth: React.FC = (props) => {
  const { user, reqLoginStatus, saveUser } = useUser();

  const redirectToLogin = () => {
    message.error('无法获取用户信息，请重新登录');
    history.replace('/login');
  };

  const getLoginStatus = async () => {
    try {
      const { data } = await reqLoginStatus.run();
      if (data?.code === HttpCode.OK && data?.profile) {
        // 保存用户状态
        saveUser(data?.profile);
      } else {
        redirectToLogin();
      }
    } catch {
      redirectToLogin();
    }
  };

  useEffect(() => {
    getLoginStatus();
  }, []);

  if (!user) {
    return <Spin />;
  }

  return <BasicLayout {...props} />;
};

export default Auth;
