/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable object-curly-newline */
/* eslint-disable max-classes-per-file */
declare global {
  interface Intl {
    // Our Intl implementation
  }
}

declare global {
  var myGlobal: string
  function myGlobalFunction(): void
  class MyClass {
    constructor()
  }
  var myGlobalObject: { foo: string }
  var myGlobalArray: number[]
  var myGlobalSymbol: symbol
  function myGlobalAsyncFunction(): Promise<void>
  // function* myGlobalGeneratorFunction(): Generator<void>
  // var myGlobalGeneratorObject: Generator<void>
  // function* myGlobalGeneratorMethod(): Generator<void>
  // async function* myGlobalAsyncGeneratorFunction(): AsyncGenerator<void>
  // var myGlobalAsyncGeneratorObject: AsyncGenerator<void>
  // async function* myGlobalAsyncGeneratorMethod(): AsyncGenerator<void>
}

// example of polyfilling
if (typeof globalThis.Intl === 'undefined') {
  Object.defineProperty(globalThis, 'Intl', {
    value: {
      // Our Intl implementation
    },
    enumerable: false,
    configurable: true,
    writable: true,
  })
}

globalThis.myGlobal = 'foo'

globalThis.myGlobalFunction = () => {
  console.log('myGlobalFunction')
}

class MyClass {
  constructor() {
    console.log('MyClass')
  }
}

globalThis.myGlobalObject = { foo: 'bar' }

globalThis.myGlobalArray = [1, 2, 3]

globalThis.myGlobalSymbol = Symbol('myGlobalSymbol')

globalThis.myGlobalAsyncFunction = async () => {
  console.log('myGlobalAsyncFunction')
}

// globalThis.myGlobalGeneratorFunction = function* () {
//   console.log('myGlobalGeneratorFunction')
// }

// globalThis.myGlobalGeneratorObject = myGlobalGeneratorFunction()

// globalThis.myGlobalGeneratorMethod = function* () {
//   console.log('myGlobalGeneratorMethod')
// }

// globalThis.myGlobalAsyncGeneratorFunction = async function* () {
//   console.log('myGlobalAsyncGeneratorFunction')
// }

// globalThis.myGlobalAsyncGeneratorObject = myGlobalAsyncGeneratorFunction()

// globalThis.myGlobalAsyncGeneratorMethod = async function* () {
//   console.log('myGlobalAsyncGeneratorMethod')
// }
