/** 排序方式 */
export type DirectionType = 'ASC' | 'DESC';

/** PL服务响应体模型 */
export type IServerModel<T = unknown> = {
  /** 响应的数据 */
  data: T;
  /** 响应业务代码 */
  code: number;
  /** 响应的消息文案 */
  message: string;
  /** 响应是否成功 */
  success: boolean;
};
