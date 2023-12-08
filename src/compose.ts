export const compose = (...functions: Array<(...args: unknown[]) => unknown>) =>
  functions.reduce(
    (acc, fn) =>
      (...args: Parameters<typeof fn>) =>
        acc(fn(...args)),
    x => x
  )

// Order of execution is reversed, same as composition, point-free style
const pipeR =
  (...functions: Array<(...args: unknown[]) => unknown>) =>
  (param: unknown) =>
    functions.reverse().reduce((result, fn) => fn(result), param)
