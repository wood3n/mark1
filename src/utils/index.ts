export { history } from "./history";
export { setLocalVolume, getLocalVolume } from "./local";

/**
 * 字节转 GB，保留两位小数
 * @export GB
 * @param {number} byte 字节数
 */
export function byte2Gb(byte: number = 0) {
	return `${(byte / Math.pow(1024, 3)).toFixed(2)} GB`;
}

/**
 * 字节转 MB，保留两位小数
 * @export GB
 * @param {number} byte 字节数
 */
export function byte2Mb(byte: number = 0) {
	return `${(byte / Math.pow(1024, 2)).toFixed(2)} MB`;
}

/**
 * 小数转百分数
 * @export
 * @param {number} [num=0] 小数
 */
export function toPercent(num: number = 0) {
	return Number((num * 100).toFixed(2));
}
