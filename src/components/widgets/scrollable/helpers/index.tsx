import { iCSSVariable } from '@busymango/utils';

import { container as element } from '@/init';
import { iStyleLenValue, size2px } from '@/utils';

/** 估算元素高度 */
export const estimateSize = () => {
  return size2px(
    iStyleLenValue(iCSSVariable('--control-size-6', { element })) ?? 32
  );
};
