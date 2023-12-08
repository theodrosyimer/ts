export const timeItSync = (label: string, fn: (...args: any) => any) => {
  console.time(label)
  fn()
  console.timeEnd(label)
}

timeItSync('test', () => 1 + 3) /*?*/
