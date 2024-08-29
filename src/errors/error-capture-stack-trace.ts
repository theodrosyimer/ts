/* eslint-disable max-classes-per-file */

import { getCallerLocation } from './error-get-caller-location.ts'

// stack trace API: [Stack trace API · V8](https://v8.dev/docs/stack-trace-api)

type AnyError<T = Error> = T extends Error ? T : never

abstract class MyErrorAbstract extends Error {
  handleOrigin: string | undefined

  constructor(
    name: string,
    message: string,
    opts: {
      cause: AnyError
    },
  ) {
    super(message, opts)
    this.name = name

    // ! don't need it?
    // i can pass a function to captureStackTrace to filter out the stack trace
    Error.captureStackTrace(this, MyErrorAbstract)
    this.handleOrigin = this.getHandleOrigin.call(this)
  }

  // static isInstance(err: unknown): err is MyErrorAbstract {
  //   // eslint-disable-next-line eqeqeq
  //   if (err == null || typeof err !== 'object') {
  //     return false
  //   }

  //   return err instanceof MyErrorAbstract
  // }

  getHandleOrigin() {
    const stackLines = this.stack?.split('\n')

    if (!stackLines?.length) {
      return 'Unknown Location'
    }

    // console.log('[this.name]:', this.name)
    // console.log(`[${this.name} stackLines]:`, stackLines)
    // Assuming the call location is on the third line of the stack
    if (stackLines.length >= 4) {
      return stackLines[2]?.trim()
    }

    return stackLines[0]?.trim()
  }
}

class DbServiceError extends MyErrorAbstract {
  // handleOrigin: string | undefined

  constructor(
    message: string,
    opts: {
      cause: AnyError
    },
  ) {
    super('DbServiceError', message, opts)

    // ! don't need it?
    // i can pass a function to captureStackTrace to filter out the stack trace
    Error.captureStackTrace(this, DbServiceError)
    this.handleOrigin = this.getHandleOrigin.call(this)
  }
}

class DbConnectionError extends MyErrorAbstract {
  // handleOrigin: string | undefined

  constructor(
    message: string,
    opts: {
      cause: AnyError
    },
  ) {
    super('DbConnectionError', message, opts)

    // ! don't need it?
    // i can pass a function to captureStackTrace to filter out the stack trace
    Error.captureStackTrace(this, DbConnectionError)
    this.handleOrigin = this.getHandleOrigin()
  }
}

class NotMyError extends Error {
  constructor(
    message: string,
    opts?: {
      cause: AnyError
    },
  ) {
    super(message, opts)

    // ! don't need it?
    // i can pass a function to captureStackTrace to filter out the stack trace
    Error.captureStackTrace(this, NotMyError)
  }
}

function dbService() {
  try {
    console.log('executing dbService that catches dbClient error...')
    dbClient()
  } catch (error) {
    if (error instanceof DbConnectionError) {
      throw new DbServiceError(`dbClient: ${error.message}`, {
        cause: error,
      })
    }
  }
}

function dbClient() {
  try {
    console.log('executing dbClient that throws...')
    // simulate an error to see the stack trace
    throw new NotMyError('The database server is down!')
  } catch (error) {
    if (error instanceof NotMyError) {
      throw new DbConnectionError(
        `Database connection failed: ${error.message}`,
        {
          cause: error,
        },
      )
    }
  }
}

// console.log(`\n${'-'.repeat(80)}\n`)
// console.log('Example 3:\n')

try {
  dbService()
} catch (err) {
  if (err instanceof DbServiceError) {
    console.error()
    console.error(err)
  }
}
