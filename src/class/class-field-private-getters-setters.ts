/* eslint-disable max-classes-per-file */
// When to use private getters and setters?
// Private getters and setters are useful when you want to:
//  - when using an aggregate class and don't want to expose the private fields but only want to change state only by using public methods YOU control.

class MyClass {
  #_field = 0

  get field() {
    return this.#_field
  }

  /** @param {string} value*/
  set #field(value: number) {
    this.#_field = value
  }
}

const c = new MyClass()
console.log(c.field)

// TypeError: Cannot set property field of #<MyClass> which has only a getter
// c.field = 1

// doesn't run
console.log(c.field)

// /////////////////

// OR

class MyClass2 {
  field = 1

  get field() {
    return this.field
  }

  // set #field(value: number) {
  //   this.field = value
  // }
}

const c2 = new MyClass2()
console.log(c2.field)

// TypeError: Cannot set property field of #<MyClass2> which has only a getter
c2.field = 2

// doesn't run
console.log(c2.field)
