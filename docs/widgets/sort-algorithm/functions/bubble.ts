export function* bubble<T>(
  source: T[],
  compare: (pre: T, cur: T) => boolean,
  size = source.length,
  swapped = true
): Generator<T[]> {
  const data = structuredClone(source);

  if (!swapped || size <= 1) return;

  swapped = false;

  for (let i = 0; i < size - 1; i++) {
    const j = i + 1;
    if (compare(data[i], data[j])) {
      [data[i], data[j]] = [data[j], data[i]];
      yield structuredClone(data);
      swapped = true;
    }
  }

  yield* bubble(data, compare, size - 1, swapped);
}
