/* eslint-disable max-classes-per-file */

// stack trace API: [Stack trace API · V8](https://v8.dev/docs/stack-trace-api)

export class ValidationError2 extends Error {
  #errors: Record<string, string | undefined>

  constructor(errors: Record<string, string | undefined>) {
    super('An error occured while validating this User entity')
    // Set the prototype explicitly only needed if i need to support:
    //  - node < 6
    //  - IE < 11
    //  - ES < 2015
    // Object.setPrototypeOf(this, new.target.prototype)

    // this.name = 'ValidationError2'
    this.#errors = errors

    // ! don't need it?
    // i can pass a function to captureStackTrace to filter out the stack trace
    Error.captureStackTrace(this)
  }

  log() {
    return this.#errors
  }

  static isInstance(err: unknown): err is ValidationError2 {
    // eslint-disable-next-line eqeqeq
    if (err == null || typeof err !== 'object') {
      return false
    }

    return err instanceof ValidationError2
  }
}

function f1() {
  try {
    return f2()
  } catch (error) {
    if (ValidationError2.isInstance(error)) {
      // console.error(error.log())
      // console.error(error.name)
      // console.error(error.message)
      // console.error(error.stack)

      throw new ValidationError2({ message: 'This is an error in f1' })
    }
  }
}
function f2() {
  try {
    return f3()
  } catch (error) {
    if (ValidationError2.isInstance(error)) {
      // console.error(error.log())
      // console.error(error.name)
      // console.error(error.message)
      // console.error(error.stack)

      throw new ValidationError2({ message: 'This is an error in f2' })
    }
  }
}
function f3() {
  throw new ValidationError2({ message: `This is an error in f3` })
}

// console.log('Example 1:\n')

try {
  f1()
} catch (err) {
  if (ValidationError2.isInstance(err)) {
    console.error(err.log())
    console.error(err.name)
    console.error(err.message)
    console.error(err.stack)
  }
}
