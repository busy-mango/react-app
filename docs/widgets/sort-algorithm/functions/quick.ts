export function* quick<T>(
  data: T[],
  compare: (a: T, b: T) => boolean,
  start = 0,
  end = data.length - 1
): Generator<T[]> {
  if (start >= end) return; // 递归结束条件

  const pivot = data[start];

  const cursor = {
    target: start,
    slot: start,
    start,
    end,
  };

  while (cursor.start !== cursor.end) {
    cursor.target = cursor.slot === cursor.start ? cursor.end : cursor.start;

    if (compare(pivot, data[cursor.target])) {
      [data[cursor.target], data[cursor.slot]] = [
        data[cursor.slot],
        data[cursor.target],
      ];
      [cursor.target, cursor.slot] = [cursor.slot, cursor.target];
      yield structuredClone(data);
    }

    if (cursor.slot === cursor.start) {
      cursor.end--;
      cursor.target = cursor.end;
    } else {
      cursor.start++;
      cursor.target = cursor.start;
    }
  }

  data[cursor.slot] = pivot;
  yield structuredClone(data);

  yield* quick(data, compare, start, cursor.start);
  yield* quick(data, compare, cursor.end, end);
}
