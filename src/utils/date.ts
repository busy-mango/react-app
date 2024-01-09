import type { Dayjs } from 'dayjs';
import dayjs, { isDayjs } from 'dayjs';

import { DateFormatEn } from '@/constants/enums';
import { isDate, isNonEmptyString, isSafeInteger } from '@busymango/is-esm';
import { ifnot } from '@busymango/utils';

function toValidDayjs(source: Dayjs) {
  return ifnot(source.isValid() && source);
}

export function toDayjs(
  /** 时间戳或字符串或dayjs对象 */
  source: string | number | undefined | Dayjs | Date | null,
  /** 指定字符串处理格式 */
  format: string = DateFormatEn.DateTime
) {
  // 处理字符串
  if (isDayjs(source)) {
    return toValidDayjs(source);
  }
  // 处理日期对象
  if (isDate(source)) {
    return toValidDayjs(dayjs(source));
  }
  // 处理字符串（指定格式）
  if (isNonEmptyString(source)) {
    return toValidDayjs(dayjs(source, format));
  }
  // 处理时间戳（毫秒）
  if (isSafeInteger(source)) {
    const { length: size } = source.toString();
    return toValidDayjs(
      dayjs(ifnot(size > 10 && size < 13 ? source * 1000 : source))
    );
  }
}
