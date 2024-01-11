/*
Works with vite.js
*/

function assertInstanceOf<T>(
  value: any,
  expectedClass: new () => T,
): asserts value is T {
  // this is the import part!
  if (import.meta.env.PROD) return
  if (!(value instanceof expectedClass)) {
    throw new Error(
      `Expected value to be a ${expectedClass.name}, but was ${value.constructor.name}`,
    )
  }
}

document.body.insertAdjacentHTML('beforeend', '<h1>Hello</h1>')

const main = document.querySelector('h1')
assertInstanceOf(main, HTMLHeadingElement)
main.textContent += ' world!'

// the code will be tree-shaken to:
document.body.insertAdjacentHTML('beforeend', '<h1>Hello</h1>')
const main2 = document.querySelector('h1')
main2.textContent += ' world!'
