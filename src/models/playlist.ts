import { useReducer, useState, useCallback } from 'react';
import { atom, useRecoilValue, useRecoilState } from 'recoil';

const initState = atom<API.Song[]>({
  key: 'playList',
  default: [],
});

/**
 * 当前播放的歌曲
 */
const useCurrentSong = () => {
  const [playList, setPlayList] = useRecoilState(initState);

  return {
    playList,
  };
};

export default useCurrentSong;
