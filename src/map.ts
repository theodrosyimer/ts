const data2 = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
  ['d', 4],
] as const)

// @ts-expect-error - `e` is not a valid key
data2.has('e')
// inferred input
data2.has('a')
