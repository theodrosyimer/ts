/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

// only handle synchronous functions
const pipe =
  <T extends (...args: any) => any>(...fns: T[]) =>
  (param: unknown) =>
    fns.reduce((result, fn) => fn(result), param)

// Handle asynchronous AND synchronous functions
const pipeP =
  <T extends (...args: any) => any>(...fns: T[]) =>
  (param: unknown | Promise<unknown>) =>
    fns.reduce(
      (result, fn) => (result.then && result.then(fn)) || fn(result),
      param
    )

// Order of execution is reversed, same as composition, point-free style
const pipeR =
  <T extends (...args: any) => any>(...fns: T[]) =>
  (param: unknown) =>
    fns.reverse().reduce((result, fn) => fn(result), param)

export {}
