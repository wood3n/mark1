import { useState, useEffect } from 'react';
import { useRequest } from 'ahooks';
import { List, Avatar, Space, Card, Tooltip, Button, Tag, Table, Image, Typography } from 'antd';
import Text from '@/components/Text';
import Link from '@/components/Link';
import { ColumnsType } from 'antd/es/table';
import {
  CalendarOutlined,
  YoutubeOutlined,
  HeartOutlined,
  FolderAddOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { Layout } from '@/layout';
import { getRecommend, getSongsDetail } from '@/services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faHeartbeat,
  faFolderPlus,
  faFolderMinus,
  faShare,
  faVolumeUp,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import faToday from '@/assets/images/2021-05-17.png';
import { Fee } from '@/constants';
import { useCurrentSong } from '@/models';
import styles from './style.less';

/**
 * 每日推荐
 */
const DailyRecommend: React.FC = () => {
  const { reqSongDetail, reqSongURL, reqSongLyric, currentSong, saveCurrentSong } =
    useCurrentSong();
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  const {
    loading,
    data,
    run: reqRecommendSongs,
  } = useRequest(getRecommend, {
    manual: true,
  });

  useEffect(() => {
    reqRecommendSongs();
  }, []);

  // 获取歌曲详情等信息
  const getSong = async ({ id, al }: API.Song) => {
    Promise.all([
      await reqSongDetail.run({ ids: id }),
      await reqSongURL.run({ ids: id }),
      await reqSongLyric.run({ id }),
    ]).then(([detail, songURL, lyrics]) => {
      saveCurrentSong({
        ...detail?.songs[0],
        playUrl: songURL?.data[0]?.url,
        lyrics: lyrics.lrc.lyric,
      });
    });
  };

  const columns: ColumnsType<API.Song> = [
    {
      width: 60,
      render: (_, record, index) => {
        if (selectedRowKeys.includes(record.id)) {
          return <FontAwesomeIcon icon={faVolumeUp} style={{ color: '#4090EB' }} />;
        }
        if (index < 9) {
          return `0${index + 1}`;
        }
        return index + 1;
      },
    },
    {
      title: '歌名',
      width: 300,
      dataIndex: 'name',
      render: (text, record) => (
        <Space>
          <Text width={250}>{text}</Text>
          {record?.mv ? (
            <a>
              <Tag color='#FA4164'>
                <div style={{ display: 'inline-block', marginRight: 4, fontSize: 14 }}>mv</div>
                <FontAwesomeIcon
                  icon={faPlay}
                  size='xs'
                  style={{ fontSize: 8, verticalAlign: 'baseline' }}
                />
              </Tag>
            </a>
          ) : null}
        </Space>
      ),
    },
    {
      title: '歌手',
      width: 200,
      dataIndex: 'artist',
      render: (_, record) => {
        return (
          <Space split={<span style={{ color: 'rgb(151, 151, 151)' }}>/</span>}>
            {record?.ar?.map((v) => (
              <Link key={v.id} width={80}>
                {v.name}
              </Link>
            ))}
          </Space>
        );
      },
    },
    {
      title: '专辑',
      width: 200,
      dataIndex: 'picUrl',
      render: (_, record) => <Link width={200}>{record?.al?.name}</Link>,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => (
        <Space size={12} style={{ verticalAlign: 'middle' }}>
          <Link icon={<FontAwesomeIcon icon={faHeart} />} />
          <Link icon={<FontAwesomeIcon icon={faHeartbeat} />} />
          <Link icon={<FontAwesomeIcon icon={faFolderMinus} />} />
          <Link icon={<FontAwesomeIcon icon={faFolderPlus} />} />
          <Link icon={<FontAwesomeIcon icon={faShare} />} />
        </Space>
      ),
    },
    {
      title: '时长',
      width: 80,
      align: 'right',
      dataIndex: 'dt',
      render: (text) => <Text type='secondary'>{dayjs(text).format('mm:ss')}</Text>,
    },
  ];

  // 过滤付费歌曲
  const freeSongs = data?.data?.dailySongs.filter(
    (v) => v.fee === Fee.Free || v.fee === Fee.SngleFree
  );
  return (
    <Layout>
      <Card bordered={false} bodyStyle={{ padding: 0 }}>
        <Space align='start' className={styles.currentSong}>
          <Image preview={false} width={90} src={currentSong?.al?.picUrl ?? faToday} />
          <Space direction='vertical'>
            <Typography.Title level={3}>
              {currentSong?.name ?? `${dayjs().format('YYYY-MM-DD HH:mm:ss')}`}
            </Typography.Title>
            {currentSong?.name && (
              <Space>
                <Button type='primary'>
                  <Space align='center'>
                    喜欢
                    <FontAwesomeIcon icon={faHeart} />
                  </Space>
                </Button>
                <Button type='primary'>
                  <Space align='center'>
                    收藏
                    <FontAwesomeIcon icon={faFolderPlus} />
                  </Space>
                </Button>
                <Button>
                  <FontAwesomeIcon icon={faShare} />
                </Button>
              </Space>
            )}
          </Space>
        </Space>
      </Card>
      <Table
        dataSource={freeSongs}
        onRow={(record) => {
          return {
            onDoubleClick: () => {
              if (!selectedRowKeys?.includes(record.id)) {
                setSelectedRowKeys([record.id]);
                getSong(record);
              }
            },
          };
        }}
        rowSelection={{
          selectedRowKeys,
        }}
        loading={loading}
        rowKey='id'
        className={styles.recommenderTable}
        pagination={false}
        size='small'
        columns={columns}
        // @ts-expect-error
        getPopupContainer={(triggerNode) => triggerNode.parentNode!}
      />
    </Layout>
  );
};

export default DailyRecommend;
