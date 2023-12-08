export const pass = <T>(value: T): Promise<T> =>
  new Promise((res) => {
    setTimeout(() => res(value), 1000)
  })

export const fail = (error: string): Promise<Error> =>
  new Promise((_, rej) => {
    setTimeout(() => rej(new Error(error)), 1000)
  })

// type GetPromiseReturnType<T> = T extends Promise<infer U> ? U : T
type GetPromiseReturnType<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>

type Result1 = Awaited<Promise<string>>
type Result2 = GetPromiseReturnType<() => Promise<string>>

type IsPromise<T> = T extends (...args: any) => Promise<any> ? true : false
