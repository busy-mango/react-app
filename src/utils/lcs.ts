import { sizeOf } from '@busymango/utils';

const iterator = <T>(source: ArrayLike<T>) => ({ length: sizeOf(source) });

/**
 * 初始化DP
 * @param source
 * @param target
 * @returns
 */
const init = (source: string, target: string) =>
  (Array(sizeOf(source) + 1).fill(null) as null[]).map(
    () => Array(sizeOf(target) + 1).fill(0) as number[]
  );

/**
 * 最长公共子串
 * @param source
 * @param target
 * @param compare
 * @returns
 */
export function iLCSubStr(
  source: string,
  target: string,
  compare = Object.is
): string {
  const dp = init(source, target);
  const { max, end } = Array.from(iterator(source), (_, i) =>
    Array.from(iterator(target), (_, j) => ({
      i: i + 1,
      j: j + 1,
      match: compare(source[i], target[j]),
    }))
  )
    .flat()
    .reduce(
      (acc, { i, j, match }) => {
        if (match) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
          if (dp[i][j] > acc.max) {
            return { max: dp[i][j], end: i - 1 };
          }
        }
        return acc;
      },
      { max: 0, end: 0 }
    );

  return source.substring(end - max + 1, end + 1);
}

/**
 * 计算`DPTable`
 */
const table = (
  source: string,
  target: string,
  compare: typeof Object.is
): number[][] => {
  const dp = init(source, target);

  Array.from(iterator(source)).forEach((_, i) => {
    Array.from(iterator(target)).forEach((_, j) => {
      if (compare(source[i], target[j])) {
        dp[i + 1][j + 1] = dp[i][j] + 1;
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]);
      }
    });
  });

  return dp;
};

/**
 * 递归计数
 * @param dp
 * @param source
 * @param target
 * @param indices
 * @param compare
 * @returns
 */
const run = (
  dp: number[][],
  source: string,
  target: string,
  indices: [number, number],
  compare: typeof Object.is
): [number, number][] => {
  if (indices[0] === 0 || indices[1] === 0) return [];
  const current: [number, number] = [indices[0] - 1, indices[1] - 1];
  if (compare(source[current[0]], target[current[1]])) {
    return run(dp, source, target, current, compare).concat([current]);
  } else if (dp[current[0]][indices[1]] >= dp[indices[0]][current[1]]) {
    return run(dp, source, target, [current[0], indices[1]], compare);
  } else {
    return run(dp, source, target, [indices[0], current[1]], compare);
  }
};

/**
 * 最长公共子序列
 * @param source
 * @param target
 * @param compare
 * @returns
 */
export const iLCSubSeq = (
  source: string,
  target: string,
  compare: typeof Object.is = Object.is
) =>
  run(
    table(source, target, compare),
    source,
    target,
    [sizeOf(source), sizeOf(target)],
    compare
  );
