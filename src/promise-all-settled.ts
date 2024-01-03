type SettledResult<T> =
  | {
      status: 'fulfilled'
      value: T
    }
  | {
      status: 'rejected'
      reason: unknown
    }

declare function promiseAllSettled<T extends readonly unknown[]>(
  promises: [...{ [K in keyof T]: Promise<T[K]> }],
): {
  [K in keyof T]: SettledResult<T[K]>
}

const p1 = Promise.resolve(3)
const p2 = Promise.resolve('foo')

const result = promiseAllSettled([p1, p2])
//    ^?
