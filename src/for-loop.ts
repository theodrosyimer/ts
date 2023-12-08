function printOutProperties<T extends Record<any, unknown>>(
  obj: T
  // filter: string[]
) {
  const toPrint = []
  for (const prop of Object.keys(obj)) {
    // need to cast prop to keyof T to get proper type checking
    const p = obj[prop as keyof T]
    if (typeof p === 'number' && p < 3) {
      toPrint.push(p)
    }
  }
  console.log(toPrint)
  return toPrint
}

const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
}

printOutProperties(obj /* filter */)
