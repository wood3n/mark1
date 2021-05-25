export { HttpCode } from './httpCode';
export { default as variable } from './variable';

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
