/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

// only handle synchronous functions
const pipe =
  <T extends (...args: any) => unknown>(...fns: T[]) =>
  (param: unknown) =>
    fns.reduce((result, fn) => fn(result), param)

// Handle asynchronous AND synchronous functions
const pipeP =
  <T extends (...args: any) => unknown>(...fns: T[]) =>
  (param: Promise<unknown>) =>
    fns.reduce((result, fn) => result.then(fn) || fn(result), param)

// Order of execution is right to left
const compose =
  <T extends (...args: any) => unknown>(...fns: T[]) =>
  (param: unknown) =>
    fns.reduceRight((result, fn) => fn(result), param)

function compose2<T extends (...args: any) => unknown>(...fns: T[]) {
  return pipe(...fns.reverse())
}
function pipe2<T extends (...args: any) => unknown>(...fns: T[]) {
  return (result: unknown) => {
    for (const fn of fns) {
      result = fn(result)
    }
    return result
  }
}

export {}
