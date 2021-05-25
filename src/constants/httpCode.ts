export enum HttpCode {
  OK = 200,
  /**
   * 永久重定向，经常被NeteaseCloudMusicApi作为未登录的接口标识
   */
  MovedPermanently = 301,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
  BadGateway = 502,
  GatewayTimeout = 504,
}
