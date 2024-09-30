import { iStyleLenValue, iThemeVariable, size2px } from '@/utils';

/** 估算元素高度 */
export const estimateSize = () => {
  return size2px(iStyleLenValue(iThemeVariable('--control-size-06')) ?? 32);
};
