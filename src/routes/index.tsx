import Login from '../pages/Login';
import Home from '../pages/Home';
import User from '../pages/User';
import Recommend from '../pages/Recommend';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
} from '@fortawesome/free-solid-svg-icons';

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
    path: '/',
    exact: true,
    component: Recommend,
  },
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/user',
    component: User,
  },
  {
    title: '我的音乐',
    children: [
      {
        title: '每日推荐',
        path: '/recommend',
        icon: <FontAwesomeIcon icon={faCalendarDay} />,
        component: Recommend,
      },
      {
        title: '私人 FM',
        path: '/fm',
        icon: <FontAwesomeIcon icon={faThumbsUp} />,
      },
      {
        title: '运动 FM',
        path: '/sport',
        icon: <FontAwesomeIcon icon={faDumbbell} />,
      },
      {
        title: '我的歌单',
        path: '/songlist',
        icon: <FontAwesomeIcon icon={faFileAudio} />,
      },
      {
        title: '我的下载',
        path: '/download',
        icon: <FontAwesomeIcon icon={faDownload} />,
      },
    ],
  },
  {
    title: '我的关注',
    children: [
      {
        title: '歌手',
        path: '/singer',
        icon: <FontAwesomeIcon icon={faUserAstronaut} />,
      },
      {
        title: '电台',
        path: '/audio',
        icon: <FontAwesomeIcon icon={faMicrophoneAlt} />,
      },
    ],
  },
  {
    title: '我的收藏',
    children: [
      {
        title: '专辑',
        path: '/special',
        icon: <FontAwesomeIcon icon={faCompactDisc} />,
      },
      {
        title: '视频',
        path: '/video',
        icon: <FontAwesomeIcon icon={faVideo} />,
      },
      {
        title: '云盘',
        path: '/clouddatabase',
        icon: <FontAwesomeIcon icon={faCloudUploadAlt} />,
      },
    ],
  },
];
