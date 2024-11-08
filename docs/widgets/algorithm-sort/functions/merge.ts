// export function* merge<T = unknown>(
//   source: T[],
//   compare: (pre: T, cur: T) => boolean,
//   size = source.length
// ): Generator<T[]> {
//   if (size === 2) {
//     compare()
//   };

//   const prefix: T[] = [];
//   const suffix: T[] = [];
//   const cursor = source.shift() as T;
//   source.forEach((item) => {
//     (compare(cursor, item) ? prefix : suffix).push(item);
//   });

//   yield* merge(prefix, compare);
// }
