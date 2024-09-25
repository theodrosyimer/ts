// Using assertions functions, nice to remove the lying type assertions
function assertBasic(
  condition: boolean | (() => boolean),
  message: string,
): asserts condition {
  if (!condition) throw new Error(message)
}

function assert<T>(
  condition: T,
  message?: string | (() => string),
): asserts condition {
  if (condition != null) return

  const givenMessage = typeof message === 'function' ? message() : message
  const prefix = 'Assertion failed'
  const formattedMessage = givenMessage
    ? `${prefix}: ${givenMessage}`
    : `${prefix}: ${condition}`

  throw new Error(formattedMessage)
}

const a = 2
const x = 1 * a
const y = 2 * a

try {
  assertBasic(() => x < y, 'You are a fool!')
  assertBasic(x + 1 > y, 'You are a fool again!')
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message)
  }
}

function assertIsNonNullish<T>(
  value: T,
  message: string,
): asserts value is NonNullable<T> {
  if (value == null) {
    throw new Error(message)
  }
}

function isNotDefined<Value>(value: Value | undefined) {
  return value !== undefined
}
const root = document.querySelector('#root')
assertIsNonNullish(root, 'Expects root to be Element type')

root.addEventListener('click', (e) => console.log(e))

function assertInstanceOf<T>(
  value: any,
  expectedClass: new () => T,
): asserts value is T {
  if (!(value instanceof expectedClass)) {
    throw new Error(
      `Expected value to be a ${expectedClass.name}, but was ${
        (value as NonNullable<unknown>).constructor.name
      }`,
    )
  }
}

document.body.insertAdjacentHTML('beforeend', '<div id="main-content">')

const canvas = document.getElementById('main-content')

// assertInstanceOf(canvas, HTMLCanvasElement)
// Runtime error
//   Expected value to be a HTMLCanvasElement, but was HTMLDivElement

// const ctx = canvas.getContext('2d')

export {}
