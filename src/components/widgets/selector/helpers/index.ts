import type { ISignType } from '../../sign';
import type { ISelectorState } from '../models';

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
