import { compact, sizeOf } from '@busymango/utils';

export interface TruncateOpts {
  maxRow?: number;
}

/**
 * 根据最大行数省略文本，防止scrollWidth超出预期长度
 */
export const ellipsis = (text: string, { maxRow = 3 }: TruncateOpts = {}) => {
  const rows = text
    ?.replace(/\r(?!\n)/g, '\n')
    ?.replace(/\r/g, '')
    ?.split('\n');

  const extremity = compact([
    rows[maxRow]?.slice(
      0,
      rows.reduce((accom, current, index) => {
        if (index >= maxRow) return accom;
        return Math.max(accom, sizeOf(current));
      }, 0)
    ),
  ]);

  return rows.slice(0, maxRow).concat(extremity).join('\n');
};
