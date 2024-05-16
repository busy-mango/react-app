/**
 * 从标准设计稿尺寸换算到当前设备应当显示的尺寸
 */
export const size2vw = (px: number) => `${px / 3.75}vw`;
