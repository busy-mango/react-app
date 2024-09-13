import { isEmpty } from '@busymango/is-esm';
import { compact, sizeOf } from '@busymango/utils';

export interface TruncateOpts {
  iDisplayLineMax?: number;
  isMergeLineBreak?: boolean;
}

/**
 * 缩略展示大段文本
 * 该方法会截取文本段，确保文本只溢出一行，且溢出行字数不高于展示行字数
 * @param text
 * @param param.iDisplayLineMax 展示的最大行数
 * @param param.isMergeLineBreak 是否合并换行符
 * @returns string
 */
export const ellipsis = (text: string, options: TruncateOpts = {}) => {
  const { iDisplayLineMax = 3, isMergeLineBreak = true } = options;

  const iLineList = text
    ?.replace(/\r(?!\n)/g, '\n')
    ?.replace(/\r/g, '')
    ?.split('\n');

  const rows = isMergeLineBreak
    ? iLineList.filter((e) => !isEmpty(e.trim()))
    : iLineList;

  const extremity = compact([
    rows[iDisplayLineMax]?.slice(
      0,
      rows.reduce((accom, current, index) => {
        if (index >= iDisplayLineMax) return accom;
        return Math.max(accom, sizeOf(current));
      }, 0)
    ),
  ]);

  return rows.slice(0, iDisplayLineMax).concat(extremity).join('\n');
};
