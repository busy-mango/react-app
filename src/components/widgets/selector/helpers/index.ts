import { iCSSVariable } from '@busymango/utils';

import { container as element } from '@/init';
import { iStyleLenValue, size2px } from '@/utils';

import type { ISignType } from '../../sign';
import type { ISelectorState } from '../models';

/** 估算元素高度 */
export const estimateSize = () => {
  return size2px(
    iStyleLenValue(iCSSVariable('--control-size-6', { element })) ?? 32
  );
};

export const iSignType = ({
  clearable,
  isFocus,
  isHover,
  open,
}: Pick<
  ISelectorState,
  'open' | 'isFocus' | 'isHover' | 'clearable'
>): ISignType => {
  const iArrow: ISignType = open ? 'arrowTop' : 'arrowBottom';

  const isShowClear = clearable && (isFocus || isHover || open);

  return isShowClear ? 'cross' : iArrow;
};
