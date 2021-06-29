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
		 * 用户名，一般没用，视频接口可能有用
		 */
		userName?: string;
		/**
		 * 昵称
		 */
		nickname?: string;
		/**
		 * 性别 1:男;2: 女
		 */
		gender?: number;
		/**
		 * 个性签名
		 */
		signature?: string;
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
		birthday?: number;
		/**
		 * 注册时间
		 */
		createTime?: number;
		/**
		 * 上次登录时间
		 */
		lastLoginTime?: number;
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
	 * 用户歌单，收藏，mv, dj 数量
	 */
	interface User_SubAccount {
		code?: number;
		/**
		 * 收藏的歌手数量
		 */
		artistCount?: number;
		/**
		 * 个人电台
		 */
		createDjRadioCount?: number;
		/**
		 * dj数量
		 */
		djRadioCount?: number;
		/**
		 * 创建的歌单数量
		 */
		createdPlaylistCount?: number;
		/**
		 * MV数量
		 */
		mvCount?: number;
		/**
		 *
		 */
		newProgramCount?: number;
		programCount?: number;
		/**
		 * 收藏的歌单数量
		 */
		subPlaylistCount?: number;
	}

	/**
	 * 个人等级
	 */
	interface User_Level {
		/**
		 * 等级
		 */
		level?: number;
		/**
		 * 当前等级特权，使用 $ 分隔，需要自行转换
		 */
		info?: string;
		/**
		 * 下一等级需要登录天数
		 */
		nextLoginCount?: number;
		/**
		 * 下一等级需要听歌的数量
		 */
		nextPlayCount?: number;
		/**
		 * 当前登录天数
		 */
		nowLoginCount?: number;
		/**
		 * 当前已经听歌数量
		 */
		nowPlayCount?: number;
		/**
		 * 距离满等级10级的进度
		 */
		progress?: number;
		/**
		 * 用户id
		 */
		userId?: number;
	}

	/**
	 * 用户等级接口数据
	 */
	interface API_User_Level {
		code?: number;
		full?: boolean;
		data?: User_Level;
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
		/**
		 * 其他艺名
		 */
		alias?: string[];
		/**
		 * 专辑数量
		 */
		albumSize?: number;
		/**
		 * mv数量
		 */
		mvSize?: number;
		/**
		 * 音乐数量
		 */
		musicSize?: number;
		/**
		 * 头像
		 */
		picUrl?: string;
		/**
		 * 人物大图，只在详情接口返回
		 */
		cover?: string;
		/**
		 * 简介
		 */
		briefDesc?: string;
		img1v1Url?: string;
		info?: string;
	}

	interface Artist_Detail {
		artist?: Artist;
		/**
		 * 歌手在网易云的用户信息
		 */
		user?: User;
		blacklist?: boolean;
		/**
		 * 动态数量
		 */
		eventCount?: number;
		/**
		 * 不知道是什么的数量
		 */
		videoCount?: number;
		/**
		 *
		 */
		videoCount?: number;
		identify?: {
			/**
			 * 认证信息
			 */
			imageDesc?: string;
			/**
			 * 认证图标
			 */
			imageUrl?: string;
		};
	}

	/**
	 * 每日推荐歌曲接口
	 */
	interface DailyRecommend {
		code: number;
		data: {
			dailySongs: Song[];
		};
	}

	/**
	 * 推荐歌单详情
	 */
	interface Recommend_SongList {
		/**
		 * 歌单名称
		 */
		name?: string;
		/**
		 * 歌单id
		 */
		id?: number;
		/**
		 * 创建者Id
		 */
		userId?: number;
		/**
		 * 推荐理由
		 */
		copywriter?: string;
		/**
		 * 创建时间，毫秒时间戳
		 */
		createTime?: number;
		/**
		 * 歌单封面
		 */
		picUrl?: string;
		/**
		 * 历史播放次数
		 */
		playcount?: number;
		/**
		 * 歌曲数量
		 */
		trackCount?: number;
		/**
		 * 创建者信息
		 */
		creator?: User;
	}

	/**
	 * 每日推荐歌单，包括私人歌单
	 */
	interface DailyRecommendList {
		code: number;
		recommend: Recommend_SongList[];
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
		/**
		 * 特权，例如付费等
		 */
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
		level: "standard";
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

	/**
	 * 专辑
	 */
	interface Album {
		/**
		 * 名称
		 */
		name?: string;
		/**
		 * 别名
		 */
		alias?: string[];
		/**
		 * id
		 */
		id?: number;
		/**
		 * 封面图片id
		 */
		picId: number;
		/**
		 * 专辑封面
		 */
		picUrl?: string;
		/**
		 * 公司
		 */
		company?: string;
		/**
		 * 发行时间，毫秒时间戳
		 */
		publishTime?: number;
		/**
		 * 收藏时间
		 */
		subTime?: number;
		/**
		 * 歌曲数量
		 */
		size?: number;
		/**
		 * 歌手
		 */
		artists?: Artist[];
		/**
		 * 专辑介绍
		 */
		description?: string;
	}

	/**
	 * 收藏专辑接口数据
	 */
	interface Collect_Album {
		code?: number;
		/**
		 * 总数
		 */
		count?: number;
		data?: Album[];
		hasMore?: boolean;
		/**
		 * 付费数量
		 */
		paidCount?: number;
	}

	/**
	 * 专辑详情数据接口
	 */
	interface Album_Detail {
		code?: number;
		resourceState?: boolean;
		album?: Album;
		songs?: Song[];
	}

	/**
	 * 专辑/唱片
	 */
	interface SongOfAlbum {
		code: number;
		resourceState: boolean;
		album: Album;
	}

	/**
	 * FM歌曲详情
	 */
	interface FM {
		/**
		 * 歌曲id
		 */
		id: number;
		/**
		 * 歌曲名称
		 */
		name: string;
		/** 专辑 */
		album: Album;
		/** 别名 */
		alias: string[];
		/** 多位歌手 */
		artists: Artist[];
		/**
		 * 毫秒时长
		 */
		duration: number;
		/**
		 * MV的id
		 */
		mvid: number;
		/**
		 * 特权，例如付费等
		 */
		privileges: any[];
	}

	/**
	 * 私人FM，一般返回三首歌曲
	 */
	interface Personal_FM {
		code: number;
		data: FM[];
		popAdjust: boolean;
	}

	/**
	 * MV详情
	 */
	interface MV {
		id?: number;
		name?: string;
		/**
		 * 创作者id
		 */
		artistId?: number;
		/**
		 * 创作者名称
		 */
		artistName?: string;
		/**
		 * 封面
		 */
		picUrl?: string;
		/**
		 * 播放次数
		 */
		playCount?: number;
		/**
		 * 推荐理由
		 */
		copywriter?: string;
		/**
		 * 所有创作者
		 */
		artists?: Artist[];
	}

	/**
	 * 推荐MV接口数据
	 */
	interface Recommend_MV {
		code: number;
		category: number;
		result?: MV[];
	}

	/**
	 * 电台详情
	 */
	interface RadioStation {
		/**
		 * 电台id
		 */
		id?: number;
		/**
		 * 电台名称
		 */
		name?: string;
		/**
		 * 电台封面
		 */
		picUrl?: string;
		/**
		 * 推荐理由
		 */
		copywriter?: string;
		/**
		 * 详情
		 */
		program?: {};
	}

	/**
	 * 推荐电台
	 */
	interface Recommend_RadioStation {
		code: number;
		category: number;
		result?: RadioStation[];
	}

	/**
	 * 收藏歌手列表接口数据
	 */
	interface Collect_Artist {
		code?: number;
		/**
		 * 歌手数量
		 */
		count?: number;
		data?: Artist[];
		hasMore?: boolean;
	}

	/**
	 * 歌手详情接口数据
	 */
	interface API_Artist_Detail {
		code?: number;
		data?: Artist_Detail;
		message?: string;
	}

	/**
	 * 歌手详情介绍
	 */
	interface API_Artist_Desc {
		code?: number;
		count?: number;
		topicData?: string;
		/**
		 * 简介
		 */
		briefDesc?: string;
		/**
		 * 详细介绍
		 */
		introduction?: {
			ti?: string;
			txt?: string;
		}[];
	}

	/**
	 * 视频详情
	 */
	interface Video {
		/**
		 * 视频id
		 */
		vid?: string;
		/**
		 * 标题
		 */
		title?: string;
		/**
		 * 别名
		 */
		aliaName?: string;
		/**
		 * 封面图片url
		 */
		coverUrl?: string;
		/**
		 * 时长（毫秒）
		 */
		durationms?: number;
		/**
		 * 播放次数
		 */
		playTime?: number;
		/**
		 * 发布者
		 */
		creator?: User[];
	}

	/**
	 * 视频播放链接数据
	 */
	interface Video_Url {
		/**
		 * 视频id
		 */
		id?: string;
		needPay?: boolean;
		/**
		 * 解析度，720p，480p，360p等
		 */
		r?: number;
		/**
		 * 大小
		 */
		size?: number;
		/** 链接 */
		url?: string;
		validityTime?: number;
	}

	/**
	 * 收藏的视频接口数据
	 */
	interface Collect_Video_List {
		code?: number;
		hasMore?: boolean;
		data?: Video[];
	}

	/**
	 * 视频播放链接接口
	 */
	interface API_Video_Url {
		code: number;
		urls?: Video_Url[];
	}

	/**
	 * 电台详情
	 */
	interface Audio {
		id?: number;
		name?: string;
		/**
		 * 类别标签
		 */
		category?: string;
		/**
		 * 类别id
		 */
		categoryId?: number;
		/**
		 * 创建时间
		 */
		createTime?: number;
		/**
		 * 简介
		 */
		desc?: string;
		/**
		 * 是否付费
		 */
		buyed?: boolean;
		/**
		 * 上次更新时间
		 */
		lastProgramCreateTime?: number;
		/**
		 * 上次节目id
		 */
		lastProgramId?: number;
		/**
		 * 上次节目名称
		 */
		lastProgramName?: string;
		/**
		 * 最近新发布的节目数量
		 */
		newProgramCount?: number;
		/**
		 * 订阅总数
		 */
		subCount?: number;
		/**
		 * 节目总数
		 */
		programCount?: number;
		/**
		 * 封面图片url
		 */
		picUrl?: string;
		/**
		 * 电台主持
		 */
		dj?: User;
	}

	/**
	 * 订阅电台列表接口
	 */
	interface Collect_Audio {
		code?: number;
		/**
		 * 总数
		 */
		count?: number;
		/**
		 *
		 */
		djRadios?: Audio[];
		/**
		 * 创建时间
		 */
		time?: number;
	}

	/**
	 * 云盘文件信息
	 */
	interface CloudFile {
		/**
		 * 歌曲id
		 */
		songId?: number;
		/**
		 * 歌词id
		 */
		lyricId?: string;
		/**
		 * 名称
		 */
		songName?: string;
		/**
		 * 文件名，带拓展名
		 */
		fileName?: string;
		/**
		 * 文件大小
		 */
		fileSize?: number;
		/**
		 * 上传时间
		 */
		addTime?: number;
		/**
		 * 比特率
		 */
		bitrate?: number;
		/**
		 * 专辑名称
		 */
		album?: string;
		/**
		 * 歌手
		 */
		artist?: string;
		/**
		 * 歌曲详情
		 */
		simpleSong?: Song;
	}

	/**
	 * 云盘信息
	 */
	interface NeteaseCloud {
		code?: number;
		/**
		 * 歌曲数量
		 */
		count?: number;
		/**
		 * 已使用字节数
		 */
		size?: number;
		/**
		 * 总空间数，如 60G = 60*1024^3
		 */
		maxSize?: number;
		data;
		hasMore?: boolean;
	}

	/**
	 * 搜索参数类型
	 */
	interface Search_Request {
		/**
		 * 搜索类型，见constants枚举
		 */
		type?: number;
		pageSize?: number;
		pageNumber?: number;
		keywords?: string;
	}

	/**
	 * 模糊搜索建议
	 */
	interface Search_Suggestion {
		/**
		 * 专辑，一般两条
		 */
		albums?: Album[];
		/**
		 * 歌手
		 */
		artists?: Artist[];
		playlists?: any[];
		songs?: Song[];
	}

	/**
	 * 模糊搜索建议接口
	 */
	interface API_Search_Suggestion {
		code?: number;
		result?: Search_Suggestion;
	}
}
