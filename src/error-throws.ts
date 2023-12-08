// source: [How to declare a function that throws an error in Typescript - Stack Overflow](https://stackoverflow.com/a/74012773)
class ValidationError {
  constructor(readonly message: string) {}

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
  if (result == null || Number.isNaN(result)) {
    return new ValidationError(`Invalid integer ${num}`)
  }
  return result
}

// caller
const result = toInt('a')

if (ValidationError.isInstance(result)) {
  console.log(result.message)
} else {
  console.log(`Success ${result}`)
}
