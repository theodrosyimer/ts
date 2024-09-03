/* eslint-disable max-classes-per-file */
// the idea comes from `c#` classes nested in a static class, it is used to group classes that are only used in one place (Command and Handler nested in a class `PlaceOrder` located at `features/PlaceOrder.ts`), and to avoid polluting the global namespace and have class names with suffixes like `PlaceOrderCommand` and `PlaceOrderHandler`.

// But there is multiple gotchas with this approach:
// - you cannot use `this` keyword in the nested classes to refer to the parent class, because it will refer to the nested class itself.

// the use of keyword `static` and more... see the logs below at the end of the file.

class PlaceOrder1 {
  static #isInternalConstructing = false

  constructor() {
    // if (this instanceof PlaceOrder1) {
    if (!PlaceOrder1.#isInternalConstructing) {
      throw new Error(
        'PlaceOrder1 is a static class and cannot be instantiated!',
      )
    }
  }

  static print = () => {
    console.dir(this)
    return this.toString()
  }
}

PlaceOrder1.Command = class Command {
  b = 'using PlaceOrder1.Command'

  doSomething() {
    console.log(this.b)
  }
}

PlaceOrder1.Handler = class Handler {
  c = 'using PlaceOrder1.Handler'

  doSomething() {
    console.log(this.c)
  }
}

// OR

class PlaceOrder2 {
  static #isInternalConstructing = false

  constructor() {
    // if (this instanceof PlaceOrder2) {
    if (!PlaceOrder2.#isInternalConstructing) {
      throw new Error(
        'PlaceOrder is a static class and cannot be instantiated!',
      )
    }
    PlaceOrder2.#isInternalConstructing = false
  }

  static print = () => {
    console.dir(this)
    return this.toString()
  }

  static Command = class Command {
    b = 'using PlaceOrder2.Command'

    doSomething() {
      console.log(this.b)
    }
  }

  static Handler = class {
    c = 'using PlaceOrder2.Handler'

    doSomething() {
      console.log(this.c)
    }
  }
}

const a1 = PlaceOrder1
const b1 = new PlaceOrder1.Command()
const c1 = new PlaceOrder1.Handler()
a1.print()
console.log(a1.toString())
b1.doSomething()
c1.doSomething()

console.log('-'.repeat(40))

const a2 = PlaceOrder2
const b2 = new PlaceOrder2.Command()
const c2 = new PlaceOrder2.Handler()
a2.print()
console.log(a2.toString())
b2.doSomething()
c2.doSomething()
