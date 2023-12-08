function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message)
  }
}

const x = 1
const y = 2

try {
  assert(x > y, "You are a fool!")
} catch (error) {

}

function assertIsNonNullish<T>(value: T, message: string): asserts value is NonNullable<T> {
  if (value == null) {
    throw new Error(message)
  }
}

const root = document.querySelector('#root')
assertIsNonNullish(root, 'Expects root to be Element type')

root.addEventListener('click', e => console.log(e) )

export {}
