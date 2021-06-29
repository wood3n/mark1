import { request } from "./request";
import dayjs from "dayjs";

/**
 * 分页参数类型
 * 官方接口用数据偏移量offset来表示分页，如果 pageIndex 从 0 开始，那么offset就是 pageIndex * pageSize；如果 pageIndex 从 1 开始，那么offset就是 (pageIndex - 1) * pageSize
 */
interface Pagination {
	pageSize?: number;
	pageNumber?: number;
}

/**
 * 登录
 * @param data 信息
 * @returns
 */
export function login(data: API.LoginRequest) {
	const { phone } = data;
	if (phone) {
		return request<API.LoginResponse>("/login/cellphone", {
			method: "post",
			data,
		});
	}

	return request<API.LoginResponse>("/login", {
		method: "post",
		data,
	});
}

/**
 * 登录状态
 */
export function getLoginStatus() {
	return request<API.LoginStatus>(`/login/status?timestamp=${dayjs().valueOf()}`, {
		method: "post",
	});
}

/**
 * 获取账号信息
 * @returns
 */
export function getUserAccount() {
	return request("/user/account", {
		method: "get",
	});
}

/**
 * 获取用户详情
 * @returns
 */
export function getUserDetail(data: Pick<API.User, "userId">) {
	const { userId: uid } = data;
	return request<API.User>("/user/detail", {
		method: "post",
		data: {
			uid,
		},
	});
}

/**
 * 获取用户信息 , 歌单，收藏，mv, dj 数量
 */
export function getUserSubAccount() {
	return request<API.User_SubAccount>("/user/subcount", {
		method: "get",
	});
}

/**
 * 获取用户等级信息，包含当前登录天数,听歌次数,下一等级需要的登录天数和听歌次数,当前等级进度
 */
export function getUserLevel() {
	return request<API.API_User_Level>("/user/level", {
		method: "get",
	});
}

/**
 * 获取歌曲详情
 */
export function getSongsDetail({ ids }: { ids: number | number[] }) {
	return request<API.SongDetail>(`/song/detail?timestamp=${dayjs().valueOf()}`, {
		method: "post",
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
		method: "post",
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
		method: "post",
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
	return request<API.Album_Detail>("/album", {
		method: "get",
		params: {
			id,
		},
	});
}

/**
 * 私人FM
 */
export function getPersonalFM() {
	return request<API.Personal_FM>("/personal_fm", {
		method: "get",
	});
}

/**
 * 获取日推歌曲
 */
export function getRecommendDailySongs() {
	return request<API.DailyRecommend>(`/recommend/songs?timestamp=${dayjs().valueOf()}`, {
		method: "get",
	});
}

/**
 * 获取每日推荐歌单
 */
export function getRecommendSongList() {
	return request<API.DailyRecommendList>("/recommend/resource", {
		method: "get",
	});
}

/**
 * 获取每日推荐MV
 */
export function getRecommendMVList() {
	return request<API.Recommend_MV>("/personalized/mv", {
		method: "get",
	});
}

/**
 * 获取每日推荐电台
 */
export function getRecommendRadioStationList() {
	return request<API.Recommend_RadioStation>("/personalized/djprogram", {
		method: "get",
	});
}

/**
 * 获取收藏的歌手
 */
export function getCollectArtists() {
	return request<API.Collect_Artist>("/artist/sublist", {
		method: "get",
		params: {
			limit: 99999,
			offset: 0,
		},
	});
}

/**
 * 获取收藏的专辑列表
 */
export function getCollectAlbums() {
	return request<API.Collect_Album>("/album/sublist", {
		method: "get",
		params: {
			limit: 99999,
			offset: 0,
		},
	});
}

/**
 * 获取收藏的视频列表
 */
export function getCollectVideos({ pageSize = 10, pageNumber = 1 }: Pagination) {
	return request<API.Collect_Video_List>(`/mv/sublist?timestamp=${dayjs().valueOf()}`, {
		method: "get",
		params: {
			limit: pageSize,
			offset: (pageNumber - 1) * pageSize,
		},
	});
}

/**
 * 获取视频详情
 */
export function getVideoDetail({ id }: { id: string }) {
	return request(`/video/detail`, {
		method: "get",
		params: {
			id,
		},
	});
}

/**
 * 获取视频详情
 */
export function getVideoUrl({ id }: { id: string }) {
	return request<API.API_Video_Url>(`/video/url`, {
		method: "get",
		params: {
			id,
		},
	});
}

/**
 * 获取订阅的电台列表
 */
export function getCollectAudios() {
	return request<API.Collect_Audio>(`/dj/sublist`, {
		method: "get",
	});
}

/**
 * 获取歌手详情
 */
export function getArtistDetail({ id }: { id?: number }) {
	return request<API.API_Artist_Detail>(`/artist/detail?timestamp=${dayjs().valueOf()}`, {
		method: "get",
		params: {
			id,
		},
	});
}

/**
 * 获取歌手描述
 */
export function getArtistDesc({ id }: { id?: number }) {
	return request<API.API_Artist_Desc>(`/artist/desc?timestamp=${dayjs().valueOf()}`, {
		method: "get",
		params: {
			id,
		},
	});
}

/**
 * 获取云盘数据
 */
export function getCloudDisk({ pageSize = 10, pageNumber = 1 }: Pagination) {
	return request<API.NeteaseCloud>(`/user/cloud?timestamp=${dayjs().valueOf()}`, {
		method: "get",
		params: {
			limit: pageSize,
			offset: (pageNumber - 1) * pageSize,
		},
	});
}

/**
 * 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开
 * type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
 */
export function getSearch({ keywords, pageSize, pageNumber, type }: API.Search_Request) {
	return request(`/cloudsearch?timestamp=${dayjs().valueOf()}`, {
		method: "get",
		params: {
			type,
			limit: pageSize,
			offset: pageNumber,
			keywords,
		},
	});
}

/**
 * 获取搜索建议
 */
export function getSearchSuggestion({ keywords }: API.Search_Request) {
	return request<API.API_Search_Suggestion>(`/search/suggest?timestamp=${dayjs().valueOf()}`, {
		method: "get",
		params: {
			keywords,
		},
	});
}

/**
 * 获取国家编码列表
 */
export function getCountryCode() {
	return request(`/countries/code/list`, {
		method: "get",
	});
}
