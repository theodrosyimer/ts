import { maybeNullishOr } from './randomizer.js'

const Right = <
  T,
  U extends (args: T) => unknown,
  V extends (args: T) => unknown,
>(
  x: T,
) => ({
  chain: (f: U) => f(x),
  map: (f: U) => Right(f(x)),
  fold: (_f: U, g: V) => g(x),
  inspect: () => `Right(${x})`,
})

const Left = <
  T,
  U extends (args: T) => unknown,
  V extends (args: T) => unknown,
>(
  x: T,
) => ({
  chain: (_f: U) => Left(x),
  map: (f: U) => Left(f(x)),
  fold: (f: U, _g: V) => f(x),
  inspect: () => `Left(${x})`,
})

export const fromNullable = <T>(x: T) => (x != null ? Right(x) : Left(null))

export const tryCatch = <T extends (...args: any) => unknown>(fn: T) => {
  try {
    return Right(fn())
  } catch (e) {
    return Left(e)
  }
}

export const tryCatchAsync = async <T>(fn: () => Promise<T>) => {
  try {
    return Right(await fn())
  } catch (e) {
    return Left(e)
  }
}

const rej = async (): Promise<string> =>
  new Promise((_, r) => {
    r(new Error('Hello from rejected myPromise'))
  })

fromNullable(maybeNullishOr('Im a value')).fold(
  (e) => e,
  (e) => e,
) /*?*/

// fromNullable(maybeNull()).inspect()

const failedPRomise = await tryCatchAsync(rej)

console.log(
  failedPRomise.fold(
    (e) => `Failure: ${e}`,
    (s) => `Success: ${s}`,
  ),
)
