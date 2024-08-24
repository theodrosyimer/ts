type NextValueUndefined = {
  value: undefined
  done: boolean
}

type NextSuccessValue<T> = {
  value: T
  done: false
}

interface Success<T> {
  success: true
  value: T
  [Symbol.iterator](): {
    next():
      | {
          value: undefined
          done: boolean
        }
      | {
          value: T
          done: boolean
        }
    // [Symbol.iterator](): {}
  }
}

type InferedAsTuple = [unknown, ...unknown[]]

function Success<const TSuccess>(value: TSuccess): Success<TSuccess> {
  return {
    success: true,
    value,
    [Symbol.iterator]() {
      let i = 0
      return {
        next() {
          i++
          if (i === 1)
            return {
              value: undefined,
              done: false,
            }
          if (i === 2) return { value, done: false }
          return { value: undefined, done: true }
        },
        [Symbol.iterator]() {
          return this
        },
      }
    },
  }
}

interface Failure<T extends Error | string> {
  success: false
  error: T
  [Symbol.iterator](): {
    next():
      | {
          value: undefined
          done: boolean
        }
      | {
          value: T
          done?: boolean
        }
    // [Symbol.iterator](): {}
  }
}

function Failure<const TError extends Error | string>(
  error: TError,
): Failure<TError> {
  return {
    success: false,
    error,
    [Symbol.iterator]() {
      let i = 0
      return {
        next() {
          i++
          if (i === 1 && error) return { value: error, done: false }
          if (i === 2) return { value: undefined, done: false }
          return { value: undefined, done: true }
        },
      }
    },
  }
}

console.log('\n>> Success')

const { success, value } = Success(10)
console.log('  ', success, value)

// can't type the returned value from the iterator as a tuple `[undefined, T]`
const [error1, value1] = Success(10)
console.log('  ', error1, value1)

console.log('\n>> Failure')

const { success: ok, error } = Failure(new Error('This is an error'))
console.log('  ', ok, error)

const { success: ok2, error: err } = Failure('This is another error')
console.log('  ', ok2, err)

// can't type the returned value from the iterator as a tuple `[TError, undefined]`
const [error2, value2] = Failure('This is another error')
console.log('  ', error2, value2)

// @ts-expect-error - wrong args
const [error3, value3] = Failure(10)
console.log('  ', error3, value3)
