/* eslint-disable max-classes-per-file */
// the idea comes from `c#` classes nested in a static class, it is used to group classes that are only used in one place (Command and Handler nested in a class `PlaceOrder` located at `features/PlaceOrder.ts`), and to avoid polluting the global namespace and have class names with suffixes like `PlaceOrderCommand` and `PlaceOrderHandler`.
class PlaceOrder1 {
  a = 1

  print() {
    console.dir(this.a)
  }
}

PlaceOrder1.Command = class Command {
  b = 'using PlaceOrder1.Command'

  print() {
    console.log(this.b)
  }
}

PlaceOrder1.Handler = class Handler {
  c = 'using PlaceOrder1.Handler'

  print() {
    console.log(this.c)
  }
}

// OR

class PlaceOrder2 {
  a = 2

  print = () => {
    console.log(this.a)
  }

  static Command = class Command {
    b = 'using PlaceOrder2.Command'

    print = () => {
      console.log(this.b)
    }
  }

  static Handler = class {
    c = 'using PlaceOrder2.Handler'

    print() {
      console.log(this.c)
    }
  }
}

const a1 = new PlaceOrder1()
const b1 = new PlaceOrder1.Command()
const c1 = new PlaceOrder1.Handler()
a1.print()
b1.print()

console.log('-'.repeat(40))

const a2 = new PlaceOrder2()
const b2 = new PlaceOrder2.Command()
const c2 = new PlaceOrder2.Handler()
a2.print()
b2.print()
c2.print()
