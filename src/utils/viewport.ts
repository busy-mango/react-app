/**
 * 从标准设计稿尺寸换算到当前设备应当显示的尺寸(vw)
 */
export const size2vw = (px: number) => `${px / 3.75}vw`;

/**
 * 从标准设计稿尺寸换算到当前设备应当显示的尺寸(px)
 */
export const size2px = (px: number) => {
  const { innerWidth } = window;
  return px * (innerWidth / 375);
};
