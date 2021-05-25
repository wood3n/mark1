import { useReducer, useState, useCallback } from 'react';
import { atom, useRecoilValue, useRecoilState } from 'recoil';
import { getSongsDetail, getSongUrl, getSongLyric, getAlbumDetail } from '@/services';
import { useRequest } from 'ahooks';

export const initState = atom<Partial<Model.Song>>({
  key: 'currentSong',
  default: {},
});

/**
 * 当前播放的歌曲
 */
const useCurrentSong = () => {
  const [currentSong, setCurrentSong] = useRecoilState(initState);

  // 获取歌曲详情
  const reqSongDetail = useRequest(getSongsDetail, {
    manual: true,
  });

  // 获取当前播放歌曲链接
  const reqSongURL = useRequest(getSongUrl, {
    manual: true,
  });

  // 获取当前歌曲歌词
  const reqSongLyric = useRequest(getSongLyric, {
    manual: true,
  });

  // 获取当前歌曲所在专辑
  const reqSongOfAlbum = useRequest(getAlbumDetail, {
    manual: true,
  });

  const saveCurrentSong = useCallback((song: Model.Song) => {
    setCurrentSong(song);
  }, []);

  return {
    reqSongDetail,
    reqSongURL,
    reqSongLyric,
    reqSongOfAlbum,
    currentSong,
    saveCurrentSong,
  };
};

export default useCurrentSong;
