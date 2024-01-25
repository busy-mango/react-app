declare namespace NodeJS {
  interface ProcessEnv {
    /** 当前环境名称 */
    ENV_NAME: string;
    /** 应用渲染容器ID */
    CONTAINER_ID: string;
    /** 应用主题样式标题: CSSRule title & Cookie name */
    THEME_TITLE: string;
    /** 应用主题样式名称 */
    THEME_DEFAULT: string;
    /** 漂亮系统域名 */
    SERVER_DOMAIN?: string;
    /** 漂亮系统API前缀 */
    SERVER_PREFIX?: string;
  }
}
