import type { IServerModel } from './common';

/** 待办数据 */
export type TodoModel = {
  /** 主键 */
  id: string;
  /** 待办名称 */
  name: string;
  /** 待办内容 */
  content: string;
  /** 跳转链接 */
  relUrl: string;
  /** 跳转参数 */
  relParam: string;
  /** 任务定义Key */
  taskDefineKey: string;
  /** 流程实例ID */
  processInstanceId: string;
};

/** 待办列表请求参数 */
export interface TodoListQueryParams {
  /** 任务报文 */
  taskDefineKeyList?: string[];
}

/** 待办列表响应体 */
export interface TodoListQueryBody extends IServerModel<TodoModel[]> {}
