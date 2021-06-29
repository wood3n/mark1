import Login from "../pages/Login";
import Home from "../pages/Home";
import User from "../pages/User";
import Recommend from "../pages/Recommend";
import Song from "../pages/Song";
import PersonalFM from "../pages/PersonalFM";
import SportFM from "../pages/SportFM";
import Album from "../pages/Album";
import AlbumDetail from "../pages/Album/Detail";
import Artist from "../pages/Collect/Artist";
import CollectVideoList from "../pages/Collect/Video";
import CollectAudioList from "../pages/Collect/Audio";
import VideoDetail from "../pages/VideoDetail";
import CloudDisk from "../pages/CloudDisk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCalendarDay,
	faCompactDisc,
	faThumbsUp,
	faDumbbell,
	faDownload,
	faUserAstronaut,
	faMicrophoneAlt,
	faVideo,
	faCloudUploadAlt,
	faFileAudio,
} from "@fortawesome/free-solid-svg-icons";

export interface RouteConfig {
	title?: string;
	path?: string;
	exact?: boolean;
	component?: React.ReactNode;
	icon?: React.ReactNode;
	children?: RouteConfig[];
}

export default [
	{
		path: "/",
		exact: true,
		component: Recommend,
	},
	{
		path: "/login",
		exact: true,
		component: Login,
	},
	{
		path: "/user",
		component: User,
	},
	{
		title: "我的音乐",
		children: [
			{
				title: "每日推荐",
				path: "/",
				exact: true,
				icon: <FontAwesomeIcon icon={faCalendarDay} />,
				component: Recommend,
			},
			{
				title: "私人 FM",
				path: "/fm",
				icon: <FontAwesomeIcon icon={faThumbsUp} />,
				component: PersonalFM,
			},
			{
				title: "运动 FM",
				path: "/sport",
				icon: <FontAwesomeIcon icon={faDumbbell} />,
				component: SportFM,
			},
			{
				title: "我的歌单",
				path: "/songlist",
				icon: <FontAwesomeIcon icon={faFileAudio} />,
			},
			{
				title: "我的下载",
				path: "/download",
				icon: <FontAwesomeIcon icon={faDownload} />,
			},
		],
	},
	{
		title: "我的关注",
		children: [
			{
				title: "电台",
				path: "/audio",
				icon: <FontAwesomeIcon icon={faMicrophoneAlt} />,
				component: CollectAudioList,
			},
		],
	},
	{
		title: "我的收藏",
		children: [
			{
				title: "歌手",
				path: "/singer",
				exact: true,
				icon: <FontAwesomeIcon icon={faUserAstronaut} />,
				component: Artist,
			},
			{
				title: "专辑",
				path: "/album",
				exact: true,
				icon: <FontAwesomeIcon icon={faCompactDisc} />,
				component: Album,
			},
			{
				path: "/album/:id",
				component: AlbumDetail,
			},
			{
				title: "视频",
				path: "/video",
				exact: true,
				icon: <FontAwesomeIcon icon={faVideo} />,
				component: CollectVideoList,
			},
			{
				path: "/video/:id",
				component: VideoDetail,
			},
			{
				title: "云盘",
				path: "/clouddatabase",
				icon: <FontAwesomeIcon icon={faCloudUploadAlt} />,
				component: CloudDisk,
			},
		],
	},
];
