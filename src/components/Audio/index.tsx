import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Slider, Image, Space, Divider, Popover, Row, Col, Typography } from 'antd';
import Link from '@/components/Link';
import dayjs from 'dayjs';
import { useDebounceFn } from 'ahooks';
import { isNil } from 'lodash-es';
import ButtonWithIcon from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVolumeDown,
  faVolumeUp,
  faVolumeMute,
  faPlay,
  faPause,
  faPauseCircle,
  faStepForward,
  faStepBackward,
  faListUl,
  faRandom,
  faHeart as faHeartSolid,
  faHeartbeat,
  faStar as faStartSolid,
  faRedo,
  faThumbsUp,
  faDumbbell,
  faDownload,
  faUserAstronaut,
  faMicrophoneAlt,
  faVideo,
  faCloudUploadAlt,
  faFileAudio,
} from '@fortawesome/free-solid-svg-icons';
import { faStar, faHeart, faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { ReactComponent as faSingle } from '@/assets/images/single.svg';
import defaultBackImg from '@/assets/images/backimg.jpg';
import { setLocalVolume, getLocalVolume } from '@/utils';
import styles from './style.less';

interface Props {
  song?: Partial<Model.Song>;
}

/**
 * 音频组件
 */
const Audio: React.FC<Props> = ({ song }) => {
  const [focus, setFocus] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [mute, setMute] = useState(false);
  const [paused, setPaused] = useState(false);
  const [volume, setVolume] = useState<number>(100);
  const audioDOMRef = useRef<HTMLAudioElement>(null);

  const initVolume = async () => {
    const initValue = await getLocalVolume();
    if (!isNil(initValue)) {
      setVolume(initValue);
    }
  };

  useEffect(() => {
    initVolume();
  }, []);

  useEffect(() => {
    console.log(song?.playUrl);
    if (song?.playUrl) {
      audioDOMRef?.current?.play();
      setPaused(false);
      setCurrentTime(0);
    }
  }, [song?.playUrl]);

  useEffect(() => {
    if (audioDOMRef?.current) {
      if (paused) {
        audioDOMRef?.current.pause();
      } else if (song?.playUrl) {
        audioDOMRef?.current.play();
      }
    }
  }, [paused]);

  useEffect(() => {
    if (audioDOMRef?.current) {
      audioDOMRef.current.volume = volume / 100;
    }
  }, [volume]);

  const volumeIcon = useMemo(() => {
    if (mute) {
      return faVolumeMute;
    }

    if (volume > 50) {
      return faVolumeUp;
    }

    return faVolumeDown;
  }, [mute, volume]);

  const progressFormatNode = useMemo(() => {
    if (song?.dt) {
      return `${dayjs.unix(currentTime).format('mm:ss')} / ${dayjs(song?.dt).format('mm:ss')}`;
    }

    return null;
  }, [currentTime, song?.dt]);

  return (
    <div
      style={{
        height: '100%',
      }}
    >
      {song?.playUrl && (
        <div
          style={{ position: 'absolute', top: 0, width: '100%' }}
          onMouseEnter={() => setFocus(true)}
          onMouseLeave={() => setFocus(false)}
        >
          <Slider
            defaultValue={30}
            tooltipVisible={false}
            min={0}
            max={dayjs(song?.dt).unix()}
            value={currentTime}
            onChange={(v: number) => {
              setCurrentTime(v);
              if (audioDOMRef.current) {
                audioDOMRef.current.currentTime = v;
                if (!paused) {
                  audioDOMRef.current.play();
                }
              }
            }}
            style={{ margin: 0, padding: 0 }}
            className={focus ? styles.sliderFocused : styles.slider}
          />
        </div>
      )}

      <Row className={styles.playBar} align='middle'>
        <Col span={6}>
          <div>
            {song?.playUrl && (
              <Space align='center'>
                <Image
                  width={50}
                  height={50}
                  preview={false}
                  src={song?.al?.picUrl ?? defaultBackImg}
                />
                {song?.name && (
                  <Space direction='vertical'>
                    <Space>
                      <Link width={100} textStyle={{ color: '#ffffff', fontSize: 14 }}>
                        {song.name}
                      </Link>
                      {progressFormatNode && (
                        <Typography.Text type='secondary'>{progressFormatNode}</Typography.Text>
                      )}
                    </Space>
                    <Space split={<span style={{ color: 'rgb(151, 151, 151)' }}>/</span>}>
                      {song?.ar?.map((v) => (
                        <Link key={v.id} width={80}>
                          {v.name}
                        </Link>
                      ))}
                    </Space>
                  </Space>
                )}
              </Space>
            )}
          </div>
        </Col>
        <Col span={12} style={{ textAlign: 'center' }}>
          <Space align='center' size={60}>
            <FontAwesomeIcon icon={faStepBackward} />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {paused ? (
                <FontAwesomeIcon
                  icon={faPause}
                  style={{ fontSize: 30 }}
                  onClick={() => {
                    setPaused(true);
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faPlay}
                  style={{ fontSize: 30 }}
                  onClick={() => {
                    setPaused(false);
                  }}
                />
              )}
            </div>
            <FontAwesomeIcon icon={faStepForward} />
          </Space>
        </Col>
        <Col span={6} style={{ textAlign: 'right' }}>
          <Space align='center' size={20}>
            <ButtonWithIcon title='随机播放' icon={faRandom} />
            <ButtonWithIcon
              title={
                <div style={{ width: 100 }}>
                  <Slider
                    value={volume}
                    onChange={(v: number) => {
                      if (mute) {
                        setMute(false);
                      }
                      setVolume(v);
                      setLocalVolume(v);
                    }}
                  />
                </div>
              }
              icon={volumeIcon}
              onClick={() => {
                setMute(!mute);
              }}
              style={{
                minWidth: 28,
              }}
            />
            <Divider type='vertical' style={{ borderLeft: '1px solid rgb(191 191 191 / 43%)' }} />
            <ButtonWithIcon title='喜欢' icon={faHeart} />
            <ButtonWithIcon title='收藏' icon={faStar} />
            <ButtonWithIcon title='播放列表' icon={faListUl} />
          </Space>
        </Col>
      </Row>
      <audio
        ref={audioDOMRef}
        preload='auto'
        src={song?.playUrl}
        onTimeUpdate={(e) => {
          // @ts-expect-error
          setCurrentTime(e.target.currentTime);
        }}
      ></audio>
    </div>
  );
};

export default Audio;
