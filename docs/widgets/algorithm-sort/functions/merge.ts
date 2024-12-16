export function* merge<T = unknown>(
  source: T[],
  compare: (pre: T, cur: T) => number,
  size = source.length
): Generator<T[]> {
  if (size === 2) {
    if (compare(source[0], source[1]) > 0) {
      //
    }
  }

  const prefix: T[] = [];
  const suffix: T[] = [];
  const cursor = source.shift() as T;
  source.forEach((item) => {
    (compare(cursor, item) ? prefix : suffix).push(item);
  });

  yield* merge(prefix, compare);
}
