// Using assertions functions nice to remove the lying type assertions
function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message)
  }
}

const x = 1
const y = 2

try {
  assert(x > y, 'You are a fool!')
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
