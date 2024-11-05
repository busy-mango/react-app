export function* bubble<T>(
  data: T[],
  compare: (pre: T, cur: T) => number,
  size = data.length,
  swapped = true
): Generator<T[]> {
  if (!swapped || size <= 1) return;

  swapped = false;

  for (let i = 0; i < size - 1; i++) {
    const j = i + 1;
    if (compare(data[i], data[j]) > 0) {
      [data[i], data[j]] = [data[j], data[i]];
      yield structuredClone(data);
      swapped = true;
    }
  }

  yield* bubble(data, compare, size - 1, swapped);
}
