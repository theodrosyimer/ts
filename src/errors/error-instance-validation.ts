/* eslint-disable max-classes-per-file */
// source: [How to declare a function that throws an error in Typescript - Stack Overflow](https://stackoverflow.com/a/74012773)
class ValidationError extends Error {
  constructor(readonly description: string) {
    super(description)
    // Set the prototype explicitly only needed if i need to support:
    //  - node < 6
    //  - IE < 11
    //  - ES < 2015
    Object.setPrototypeOf(this, new.target.prototype)

    Error.captureStackTrace(this)
  }

  static isInstance(err: unknown): err is ValidationError {
    // eslint-disable-next-line eqeqeq
    if (err == null || typeof err !== 'object') {
      return false
    }

    return err instanceof ValidationError
  }
}

function toInt(num: string): number | ValidationError {
  const result = Number.parseInt(num)
  if (Number.isNaN(result)) {
    throw new ValidationError(`Invalid integer ${num}`)
  }
  return result
}

const result = toInt('a')

if (ValidationError.isInstance(result)) {
  console.log(result.message)
} else {
  console.log(`Success ${result}`)
}
