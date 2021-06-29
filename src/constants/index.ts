export { HttpCode } from "./httpCode";
export { default as variable } from "./variable";

/**
 * 音乐收费信息
 * 0: 免费
 * 1: VIP
 * 4: 购买专辑
 * 8: SQ，HQ免费
 */
export enum Fee {
	SngleFree = 0,
	SingleVIP = 4,
	VIP = 1,
	Free = 8,
}

/**
 * 搜索类型
 */
export enum SearchTypeEnum {
	/**
	 * 默认，单曲
	 */
	Default = 1,
	/**
	 * 专辑
	 */
	Album = 10,
	/**
	 * 歌手
	 */
	Artist = 100,
	/**
	 * 歌单
	 */
	SongList = 1000,
	/**
	 * 用户
	 */
	User = 1002,
	/**
	 * MV
	 */
	MV = 1004,
	/**
	 * 歌词
	 */
	Lyrics = 1006,
	/**
	 * 电台
	 */
	Radio = 1009,
	/**
	 * 视频
	 */
	Video = 1014,
	/**
	 * 所有
	 */
	All = 1018,
}

/**
 * 性别称呼
 */
export const GenderMap: Record<number, string> = {
	1: "男",
	2: "女",
};
