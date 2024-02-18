declare const fn: ((a: string) => string) & ((a: number) => number)

const x1 = fn('a') // string
const x2 = fn(1) // number

export {}
