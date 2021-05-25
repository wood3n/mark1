import { extend } from 'umi-request';
import { HttpCode } from '@/constants';
import { history } from '@/utils';

export const request = extend({
  /**
   * 开发环境proxy请求头
   */
  prefix: '/api',
  timeout: 1000,
  /**
   * neteasecloudmusicapi使用fetch请求包含 cookies 信息
   */
  credentials: 'include',
});

/**
 * 未登录拦截处理
 * TODO: 这里没有跳转成功，暂时不清楚原因
 */
request.interceptors.response.use((response) => {
  if (response.status === HttpCode.MovedPermanently) {
    history.push('/login');
  }

  return response;
});
