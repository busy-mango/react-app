export function* quick<T>(
  data: T[],
  compare: (a: T, b: T) => number,
  start = 0,
  end = data.length - 1
): Generator<T[]> {
  if (start >= end) return;

  const pivot = data[start];

  const cursor = { slot: start, start, end };

  while (cursor.start !== cursor.end) {
    const isStart = cursor.slot === cursor.start;
    const target = isStart ? cursor.end : cursor.start;

    const res = compare(pivot, data[target]);
    if (isStart ? res > 0 : res < 0) {
      [data[target], data[cursor.slot]] = [data[cursor.slot], data[target]];
      isStart ? cursor.start++ : cursor.end--;
      cursor.slot = isStart ? cursor.end : cursor.start;
      yield structuredClone(data);
    } else {
      isStart ? cursor.end-- : cursor.start++;
    }
  }

  data[cursor.slot] = pivot;
  yield structuredClone(data);
  yield* quick(data, compare, cursor.slot + 1, end);
  yield* quick(data, compare, start, cursor.slot - 1);
}
