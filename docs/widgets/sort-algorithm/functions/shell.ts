export function* shell<T>(
  data: T[],
  compare: (a: T, b: T) => boolean,
  gap = Math.floor(data.length / 2)
): Generator<T[]> {
  const size = data.length;

  if (gap <= 0) return;

  for (let i = gap; i < size; i++) {
    let j = i;
    while (j >= gap && compare(data[j - gap], data[j])) {
      [data[j], data[j - gap]] = [data[j - gap], data[j]];
      j -= gap;
      yield structuredClone(data);
    }
  }

  yield* shell(data, compare, Math.floor(gap / 2));
}
