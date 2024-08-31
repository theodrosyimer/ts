export const pass = <T>(value: T, ms: number): Promise<T> =>
  new Promise((res) => {
    setTimeout(() => res(value), ms)
  })

export const fail = (error: string, ms: number): Promise<Error> =>
  new Promise((_, rej) => {
    setTimeout(() => rej(new Error(error)), ms)
  })
