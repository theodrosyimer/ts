/* eslint-disable max-classes-per-file */

import { getCallerLocation } from './error-get-caller-location.js'

// stack trace API: [Stack trace API · V8](https://v8.dev/docs/stack-trace-api)

export class ValidationError2 extends Error {
  #errors: Record<string, string | undefined>

  constructor(errors: Record<string, string | undefined>) {
    super('An error occured while validating this User entity')
    // Set the prototype explicitly only needed if i need to support:
    //  - node < 6
    //  - IE < 11
    //  - ES < 2015
    Object.setPrototypeOf(this, new.target.prototype)

    this.name = 'ValidationError2'
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
      console.log(error.log())
      // console.log(error.name)
      // console.log(error.message)
      // console.log(error.stack)

      throw new ValidationError2({ message: 'This is an error in f1' })
    }
  }
}
function f2() {
  try {
    return f3()
  } catch (error) {
    if (ValidationError2.isInstance(error)) {
      console.log(error.log())
      // console.log(error.name)
      // console.log(error.message)
      console.log(error.stack)

      throw new ValidationError2({ message: 'This is an error in f2' })
    }
  }
}
function f3() {
  throw new ValidationError2({ message: `This is an error in f3` })
}

try {
  f1()
} catch (error) {
  // console.log(error.log())
  // console.log(error.stack)
}

console.log(`\n${'-'.repeat(80)}\n`)
// /////////////////////////////////////////////////////

// source: [node.js - Understanding Error.captureStackTrace and stack trace persistance? - Stack Overflow](https://stackoverflow.com/questions/59625425/understanding-error-capturestacktrace-and-stack-trace-persistance)

function fun1() {
  fun2()
}
function fun2() {
  fun3()
}
function fun3() {
  logStack()
}
function logStack() {
  const err = new Error()
  Error.captureStackTrace(err)
  console.log('ERROR_STACK:')
  console.log(err.stack)
  console.log()
  console.log('ERROR_LOCATION:')
  console.log(getCallerLocation())
}

fun1()

console.log(`\n${'-'.repeat(80)}\n`)

class MyError1 extends Error {
  constructor(message: string) {
    super(message)

    // ! don't need it?
    // i can pass a function to captureStackTrace to filter out the stack trace
    Error.captureStackTrace(this)
  }
}

class MyError2 extends Error {
  constructor(message: string) {
    super(message)

    // ! don't need it?
    // i can pass a function to captureStackTrace to filter out the stack trace
    Error.captureStackTrace(this, MyError2)
  }

  static isInstance(err: unknown): err is MyError2 {
    // eslint-disable-next-line eqeqeq
    if (err == null || typeof err !== 'object') {
      return false
    }

    return err instanceof MyError2
  }
}

function Do1() {
  try {
    console.log('executing do 1')
    Do2()
  } catch (error) {
    if (error instanceof Error) {
      console.log('error in Do1', error)
      console.log('here is the stack ', error.stack)
      throw new MyError1('threw error from do1 in myerror1')
      // throw error;}
    }
  }
}

function Do2() {
  try {
    console.log('executing do 2')
    throw new MyError2('threw error from do2 in myerror2')
  } catch (error) {
    if (error instanceof Error) {
      console.log('error in Do2', error)
      throw error
    }
  }
}

Do1()
