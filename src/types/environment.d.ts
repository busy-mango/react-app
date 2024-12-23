declare namespace NodeJS {
  interface ProcessEnv {
    /** 是否启用 ReactScan */
    SCAN?: boolean;
    /** 客户端默认主题样式 */
    THEME: string;
    /** 当前环境名称 */
    ENV_NAME: string;
    /** 客户端渲染容器ID */
    CONTAINER_ID: string;
    /** 服务端域名 */
    SERVER_DOMAIN?: string;
    /** 服务端API前缀 */
    SERVER_PREFIX?: string;
  }
}
