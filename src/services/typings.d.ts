/**
 * 从接口获取的数据结构
 */
declare namespace API {
  interface LoginRequest {
    phone?: string;
    email?: string;
    password: string;
  }

  /**
   * 登录接口数据
   */
  interface LoginResponse {
    /**
     * 成功200，失败502
     */
    code: number;
    account: Record<string, any>;
    profile: User;
    /**
     * 报错信息
     */
    message?: string;
    msg?: string;
  }

  /**
   * 登录状态接口数据
   */
  interface LoginStatus {
    data: {
      code: number;
      profile: User;
      account: Account;
    };
  }

  /**
   * 账户信息
   */
  interface Account {
    /**
     * 用户id
     */
    id?: string;
    /**
     * 创建时间，毫秒时间戳
     */
    createTime?: number;
    /**
     * 是否付费用户
     */
    paidFee?: boolean;
    /**
     * vip类型
     */
    vipType?: number;
  }

  /**
   * 用户信息
   */
  interface User {
    /**
     * 用户id
     */
    userId?: string;
    /**
     * 昵称
     */
    nickname?: string;
    /**
     * 性别 1:男
     */
    gender?: number;
    /**
     * 头像链接地址
     */
    avatarUrl?: string;
    /**
     * 移动端背景图像
     */
    backgroundUrl?: string;
    /**
     * 生日，毫秒时间戳
     */
    birthday?: bigint;
    /**
     * 行政区划代码 - 省
     */
    province?: number;
    /**
     * 行政区划代码 - 市
     */
    city?: number;
    /**
     * 介绍
     */
    description?: string;
    /**
     * 粉丝数
     */
    followeds?: number;
    /**
     * 关注人数
     */
    follows?: number;
    /**
     * 个人创建的歌单数目
     */
    playlistCount?: number;
  }

  /**
   * 专辑
   */
  interface Special {
    id: number;
    name: string;
    picUrl: string;
  }

  /**
   * 歌手
   */
  interface Artist {
    id: number;
    name: string;
  }

  /**
   * 每日推荐接口
   */
  interface DailyRecommend {
    code: number;
    data: {
      dailySongs: Song[];
    };
  }

  /**
   * 歌曲播放链接接口
   */
  interface SongUrl {
    code: number;
    data: Song_Url[];
  }

  /**
   * 歌曲详情
   */
  interface Song {
    /**
     * 歌曲id
     */
    id: number;
    /**
     * 歌曲名称
     */
    name: string;
    /**
     * 专辑信息
     */
    al?: Special;
    /**
     * 歌手信息，可能有多个
     */
    ar?: Artist[];
    /**
     * 毫秒时长
     */
    dt?: number;
    /**
     * MV的Id，没有就是0
     */
    mv?: number;
    /**
     * 收费信息
     * 0: 免费
     * 1: VIP
     * 4: 购买专辑
     * 8: SQ，HQ免费
     */
    fee?: 0 | 1 | 4 | 8;
  }

  interface SongDetail {
    code: number;
    privileges: any[];
    songs: Song[];
  }

  /**歌曲播放链接 */
  interface Song_Url {
    id: number;
    /**
     * 播放链接
     */
    url: string;
    /**
     * 音质
     */
    level: 'standard';
    /**
     * 收费信息
     * 0: 免费
     * 1: VIP
     * 4: 购买专辑
     * 8: SQ，HQ免费
     */
    fee?: 0 | 1 | 4 | 8;
    /**
     * 存储体积，Byte
     */
    size: number;
  }

  /**
   * 歌词
   */
  interface Lyric {
    lyric?: string;
    version?: number;
  }

  /**
   * 歌曲歌词接口
   */
  interface SongLyric {
    code: number;
    klyric: Lyric;
    /**
     * 歌词
     */
    lrc: Lyric;
    tlyric: Lyric;
    qfy: boolean;
    sfy: boolean;
    sgc: boolean;
  }

  interface Album {}

  /**
   * 专辑/唱片
   */
  interface SongOfAlbum {
    code: number;
    resourceState: boolean;
    album: Album;
  }
}
