type Separator = ' ' | '\t' | '\n' | '-'

const newArrayFromCounterWithMapFn = (
  count: number,
  fn: (element: undefined) => Separator
): Separator[] => [...Array<undefined>(count)].map(fn)

// eslint-disable-next-line
const setSeparator = (separator: Separator) => (_element: undefined) =>
  separator

const tabSeparator = setSeparator('\t') // ?
newArrayFromCounterWithMapFn(3, tabSeparator) // ?

const spaceSeparator = setSeparator(' ')
newArrayFromCounterWithMapFn(1, spaceSeparator) // ?

const newlineSeparator = setSeparator('\n')
newArrayFromCounterWithMapFn(4, newlineSeparator) // ?
