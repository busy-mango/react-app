export function* selection<T>(
  data: T[],
  compare: (pre: T, cur: T) => boolean,
  start = 0
): Generator<T[]> {
  const size = data.length;
  if (start >= size - 1) return;

  for (let i = start; i < size; i++) {
    if (compare(data[start], data[i])) {
      [data[i], data[start]] = [data[start], data[i]];
      yield structuredClone(data);
    }
  }

  yield* selection(data, compare, start + 1);
}
