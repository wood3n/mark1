import { request } from './request';
import dayjs from 'dayjs';

/**
 * 登录
 * @param data 信息
 * @returns
 */
export function login(data: API.LoginRequest) {
  const { phone } = data;
  if (phone) {
    return request<API.LoginResponse>('/login/cellphone', {
      method: 'post',
      data,
    });
  }

  return request<API.LoginResponse>('/login', {
    method: 'post',
    data,
  });
}

/**
 * 登录状态
 */
export function getLoginStatus() {
  return request<API.LoginStatus>('/login/status', {
    method: 'post',
  });
}

/**
 * 获取账号信息
 * @returns
 */
export function getUserAccount() {
  return request('/user/account', {
    method: 'get',
  });
}

/**
 * 获取用户详情
 * @returns
 */
export function getUserDetail(data: Pick<API.User, 'userId'>) {
  const { userId: uid } = data;
  return request<API.User>('/user/detail', {
    method: 'post',
    data: {
      uid,
    },
  });
}

/**
 * 获取每日推荐歌曲
 */
export function getRecommend() {
  return request<API.DailyRecommend>(`/recommend/songs?timestamp=${dayjs().valueOf()}`, {
    method: 'get',
  });
}

/**
 * 获取歌曲详情
 */
export function getSongsDetail({ ids }: { ids: number | number[] }) {
  return request<API.SongDetail>(`/song/detail?timestamp=${dayjs().valueOf()}`, {
    method: 'post',
    data: {
      ids: String(ids),
    },
  });
}

/**
 * 获取歌曲播放链接
 */
export function getSongUrl({ ids }: { ids: number | number[] }) {
  return request<API.SongUrl>(`/song/url?timestamp=${dayjs().valueOf()}`, {
    method: 'post',
    data: {
      id: String(ids),
    },
  });
}

/**
 * 获取歌曲歌词
 * @param param0 歌曲id
 */
export function getSongLyric({ id }: { id: number }) {
  return request<API.SongLyric>(`/lyric?timestamp=${dayjs().valueOf()}`, {
    method: 'post',
    data: {
      id: String(id),
    },
  });
}

/**
 * 获取专辑内容
 * @param param0 专辑id
 */
export function getAlbumDetail({ id }: { id?: number }) {
  return request('/album', {
    method: 'post',
    data: {
      id: String(id),
    },
  });
}
