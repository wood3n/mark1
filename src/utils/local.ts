import localforage from 'localforage';

/**
 * localforage默认走的是IndexDB存储，详细文档：https://localforage.github.io/localForage/
 * 设置音量
 * @param volume 音量
 */
export async function setLocalVolume(volume: number) {
  return localforage.setItem('volume', volume);
}

/**
 * 获取音量
 * @param volume 音量
 */
export async function getLocalVolume() {
  return localforage.getItem<number>('volume');
}
