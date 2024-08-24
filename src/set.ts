const data = new Set(['a', 'b', 'c', 'd'] as const)

// @ts-expect-error - `e` is not a valid key
data.has('e')
