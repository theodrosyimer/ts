/* eslint-disable max-classes-per-file */
/**
 * @link https://www.typescriptlang.org/docs/handbook/2/classes.html#initialization-order
 *
 * #### Initialization Order

The order that JavaScript classes initialize can be surprising in some cases. Let’s consider this code:

    class Base {

      name = "base";

      constructor() {

        console.log("My name is " + this.name);

      }

    }

    class Derived extends Base {

      name = "derived";

    }

    // Prints "base", not "derived"

    const d = new Derived();

    [Try](https://www.typescriptlang.org/play/#code/MYGwhgzhAEBCkFNoG8CwAoa0B2YC2SAvNAEQBGiJA3BlsAPbYQAuATgK7DP2sAUAlClpZoDJvRAIAdCHoBzXiQCyATxz4kASxgloAamjMAFtqm4C-GpmgBfDHfQZQkGABEErTQDcEAE2gIAB7MCNi+MPAQSGjW5kSkvh7eftT2GBgA9BnQAAqe2Mw6FFEkADQ49MwJST6+JE6MLND+xNgIAO7Q7p61AlRAA)

What happened here?

The order of class initialization, as defined by JavaScript, is:

  * The base class fields are initialized
  * The base class constructor runs
  * The derived class fields are initialized
  * The derived class constructor runs

This means that the base class constructor saw its own value for `name` during its own constructor, because the derived class field initializations hadn’t run yet.
 **/
class Animal {
  #sound = 'rustling noise in the bushes'

  get sound() {
    return this.#sound
  }

  set sound(val) {
    this.#sound = val
  }

  makeSound() {
    console.log(this.#sound)
  }
}

const a = new Animal()
a.makeSound() // 3.14

class Lion extends Animal {
  #sound = 'RAWR!'
}

const lion = new Lion()
lion.makeSound() // ? BUG! Expected "RAWR!" but got "rustling noise in the bushes"

const test = new Animal()
test.makeSound() // ?

export {}
