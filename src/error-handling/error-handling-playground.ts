const isEmptyString = <T>(input: T) => {
  if (!input && typeof input === 'string') return true
  return false
}

isEmptyString('') /*?*/
isEmptyString('test') /*?*/
isEmptyString(' ') /*?*/
isEmptyString(null) /*?*/
isEmptyString([]) /*?*/
isEmptyString({}) /*?*/
isEmptyString(0) /*?*/
isEmptyString(1) /*?*/
isEmptyString(() => console.log('hello')) /*?*/
isEmptyString(() => 'hello') /*?*/

const isNonEmptyString = <T>(input: T) => {
  if (!isEmptyString(input) /*  && typeof input === 'string' */) return true
  return false
}

isNonEmptyString(' ') /*?*/
isNonEmptyString('test') /*?*/
isNonEmptyString('') /*?*/
isNonEmptyString(null) /*?*/
isNonEmptyString([]) /*?*/
isNonEmptyString({}) /*?*/
isNonEmptyString(0) /*?*/
isNonEmptyString(1) /*?*/
isNonEmptyString(() => console.log('hello')) /*?*/
isNonEmptyString(() => 'hello') /*?*/

const getProp = (input: string) => {
  if (!input || isEmptyString(input)) {
    throw new Error(
      `Expected a string but received ${
        typeof input !== 'string' ? typeof input : 'an empty string'
      }`,
    )
  }
  return input
}
