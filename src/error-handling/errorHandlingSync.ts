import { maybeTrueOrFalse } from '../randomizer.js'

// ///////////////////////////////////////

/* Using an Object to return an error */

// ///////////////////////////////////////

// Using an object to return an error message instead of throwing an error
const functionthatCanGoWrong = (
  value: string,
): { error: string } | { value: string } => {
  const isValid = maybeTrueOrFalse()
  if (!isValid) {
    return { error: 'Invalid value' }
  }
  return { value }
}

// That way, we (developers) MUST handle both cases
const submit = (email: string): void => {
  const result = functionthatCanGoWrong(email)
  if ('error' in result) {
    // notify user...
    console.log(result.error)
    return
  }
  // save value...
  console.log(result.value)
}

submit('Hello world')

// ///////////////////////////////////////

/* Using a Tuple and returning a string as an error */

// ///////////////////////////////////////

const functionthatCanGoWrong2 = (
  value: string,
): [string, null] | [null, string] => {
  const isValid = maybeTrueOrFalse()
  if (!isValid) return ['Invalid value', null]
  return [null, value]
}

const submit2 = (email: string): void => {
  const [error, value] = functionthatCanGoWrong2(email)
  if (error != null) {
    // notify user...
    console.log(error)
    return
  }
  // save value...
  console.log(value)
}

submit2('Hello world')

// ///////////////////////////////////////

/* Using a Tuple and returning an 'Error' Object */

// ///////////////////////////////////////

const functionthatCanGoWrong3 = (
  value: string,
): [Error, null] | [null, string] => {
  const isValid = maybeTrueOrFalse()
  if (!isValid) return [new Error('Invalid value'), null]
  return [null, value]
}

const submit3 = (email: string) => {
  const [error, value] = functionthatCanGoWrong3(email)
  if (error instanceof Error) {
    // notify user...
    console.log(error)
    return
  }
  // save value...
  console.log(value)
}

submit3('Hello world') /*?*/
