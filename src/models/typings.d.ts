/**
 * 页面需要的数据，在API基础上做兼容改造
 */
declare namespace Model {
  interface Song extends API.Song {
    /**
     * 播放链接
     */
    playUrl?: string;
    /**
     * 歌词
     */
    lyrics?: string;
  }
}
