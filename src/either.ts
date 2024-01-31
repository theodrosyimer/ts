import { fail } from './promises.js'
import { maybeNullishOr } from './randomizer.js'

class Either {
  Right<T>(x: T) {
    return {
      chain: <U>(f: (x: T) => U) => f(x),
      map: <U>(f: (x: T) => U) => this.Right(f(x)),
      fold: <U>(_f: (x: T) => U, g: (x: T) => U) => g(x),
      inspect: () => `Right(${x})`,
    }
  }

  Left<T>(x: T) {
    return {
      chain: <U>(_f: (x: T) => U) => this.Left(x),
      map: <U>(f: (x: T) => U) => this.Left(f(x)),
      fold: <U>(f: (x: T) => U, _g: (x: T) => U) => f(x),
      inspect: () => `Left(${x})`,
    }
  }
}

function Right<
  T,
  U extends (args: T) => unknown,
  V extends (args: T) => unknown,
>(x: T) {
  return {
    chain: (f: U) => f(x),
    map: (f: U) => Right(f(x)),
    fold: (_f: U, g: V) => g(x),
    inspect: () => `Right(${x})`,
  }
}

function Left<
  T,
  U extends (args: T) => unknown,
  V extends (args: T) => unknown,
>(x: T) {
  return {
    chain: (_f: U) => Left(x),
    map: (f: U) => Left(f(x)),
    fold: (f: U, _g: V) => f(x),
    inspect: () => `Left(${x})`,
  }
}

export function fromNullable<T>(x: T) {
  return x != null ? Right(x) : Left(null)
}

export const tryCatch = <T extends (...args: any) => unknown>(fn: T) => {
  try {
    return Right(fn())
  } catch (e) {
    return Left(e)
  }
}

export async function tryCatchAsync<T>(fn: (...args: any[]) => Promise<T>) {
  try {
    const data = await fn()
    return Right(data)
  } catch (e) {
    return Left(e)
  }
}

fromNullable(maybeNullishOr('Im a value')).fold(
  (e) => e,
  (e) => e,
) /*?*/

// fromNullable(maybeNull()).inspect()

const failedPRomise = await tryCatchAsync(fail)

console.log(
  failedPRomise.fold(
    (e) => `Failure: ${e}`,
    (s) => `Success: ${s}`,
  ),
)
