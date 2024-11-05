export function* insert<T>(
  data: T[],
  compare: (pre: T, cur: T) => number,
  end = 1
): Generator<T[]> {
  const size = data.length;

  for (let i = end; i > 0; i--) {
    const j = i - 1;
    if (compare(data[j], data[i]) > 0) {
      [data[i], data[j]] = [data[j], data[i]];
      yield structuredClone(data);
    }
  }

  if (end === size - 1) return;

  yield* insert(data, compare, end + 1);
}
