import { isEmpty, isNonEmptyString, isString } from '@busymango/is-esm';
import { ifnot } from '@busymango/utils';

import type { ControlOption } from '../../control';
import type { ISignType } from '../../sign';
import type { ISelectorState } from '../models';

export const iSignType = ({
  clearable,
  isFocus,
  isHover,
  value,
  open,
}: Pick<
  ISelectorState,
  'open' | 'isFocus' | 'isHover' | 'clearable' | 'value'
>): ISignType => {
  const iArrow: ISignType = open ? 'arrowTop' : 'arrowBottom';

  const isShowClear = clearable && (isFocus || isHover || open);

  return isShowClear && !isEmpty(value) ? 'cross' : iArrow;
};

export const iPredicate = (
  { title, label }: ControlOption,
  keyword?: string
) => {
  if (!isNonEmptyString(keyword)) return true;
  const text = title ?? ifnot(isString(label) && label);
  return text?.toLowerCase()?.includes(keyword?.toLowerCase()) ?? false;
};
