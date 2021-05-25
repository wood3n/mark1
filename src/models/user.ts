import { useState } from 'react';
import { atom, useRecoilValue, useRecoilState, selector } from 'recoil';
import { message } from 'antd';
import { useRequest } from 'ahooks';
import { getLoginStatus, getUserDetail } from '@/services';
import { HttpCode } from '@/constants';

const initState = atom<API.User>({
  key: 'user',
  default: {},
});

export const initUser = selector({
  key: 'currentUser',
  get: async () => {
    const { data } = await getLoginStatus();
    console.log(data);
    return data?.profile;
  },
});

/**
 * 全局用户信息
 */
const useUser = () => {
  const [user, setUser] = useRecoilState(initState);

  /**
   * 请求登录状态
   */
  const reqLoginStatus = useRequest(getLoginStatus, {
    manual: true,
  });

  /**
   * 获取用户详情
   */
  const reqUserDetail = useRequest(getUserDetail, {
    manual: true,
  });

  // 保存用户信息
  const saveUser = (user: API.User) => {
    setUser(user);
  };

  return {
    user,
    saveUser,
    reqLoginStatus,
    reqUserDetail,
  };
};

export default useUser;
