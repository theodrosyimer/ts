/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// see: [Branded Types give you stronger input validation - YouTube](https://www.youtube.com/watch?v=rpw59rajUSI&list=PLCWy_0yV0bgi45-OKHuc4qG066BKN8kdL&index=9&ab_channel=AndrewBurgess)

// type EmailAddress = string & { __brand: 'EmailAddress' }
// or using an utility type
type Brandedtype<T, K> = T & { __brand: K }
type EmailAddress = Brandedtype<string, 'EmailAddress'>

// function used to cast from a type to a brandedType
function isEmailAddress(email: string): email is EmailAddress {
  return email.includes('@gmail.com')
}

function assertEmailAddress(email: string): asserts email is EmailAddress {
  if (!email.includes('@gmail.com')) {
    throw new Error(`Invalid argument: ${email} is not an email address`)
  }
}

function sendWelcomeEmail(email: EmailAddress) {
  // ...
}

// can be an handler for a signup endpoint
// by asserting and throwing an error
// we can convert it to a 404 that goes back to the client
function signUp1(email: string) {
  assertEmailAddress(email) // throw

  sendWelcomeEmail(email)
}

// cast to a brandedType if don't need to throw
function signUp2(email: string) {
  if (isEmailAddress(email) /* cast email from `string` to `EmailAdress` */) {
    sendWelcomeEmail(email)
  }

  //  handle this code branch...
}

// Another example
//
// see: [javascript - TypeScript type string of specific characters - Stack Overflow](https://stackoverflow.com/a/56720473/9103915)
// note: Opaque = Branded Type

type Opaque<T, K> = T & { __TYPE__: K }
type HexCode = Opaque<string, 'HexCode'>

const createHexCode = (str: string): HexCode => {
  // implementation that forces string to be hexCode
  assertHexCode(str)
  return str // now `str` is of type `HexCode`.
}

const test = createHexCode('#333')
const isAssignableString: string = test // yes anything that is HexCode is still technically a string.

// @ts-expect-error
const isAssignableHexCode: HexCode = 'standard string' // error
const isAssignableHexCode2: HexCode = test // works

// using function to assert a branded ype
function assertHexCode(hex: string): asserts hex is HexCode {
  const rg = /#\d{3}/g
  if (!rg.test(hex)) {
    throw new Error(`Invalid argument: ${hex} is not a hex code value`)
  }
}
