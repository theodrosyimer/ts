/* eslint-disable max-classes-per-file */

// when the `new` keyword is used to create a class, 3 things happen:
// 1. a new instance of the class is created
// 2. `this` is set to the new instance (here `instance`)
// 3. when assigning an new instance to a variable, the variable's `__proto__` is set to the class' `prototype` property (`instance.__proto__ === Example.prototype`)

// ES7 syntax version
// Best method because of how `this` is handle (lexical scope) using an arrow function as a method
class Human {
  gender = 'male'

  printGender = () => {
    console.log(this.gender)
    return this.gender
  }
}
class Person extends Human {
  name = 'Max'

  printMyName = () => {
    console.log(this.name)
    return this.name
  }
}

const person = new Person()
person.printMyName() // ?
person.printGender() // ?

// `this` is set when assigning a new instance of a class to a variable !!!
// that why using ES7 syntax IS better
const person1 = new Person()
const p1 = person1.printMyName
const p2 = person1.printGender

// the code will NOT blow up
p1() // ?
p2() // ?

// / //////////////////////////////////////////////////////////////////////////////////

// ES6 syntax version
class Human1 {
  gender: string

  constructor() {
    this.gender = 'male'
  }

  printGender() {
    console.log(this.gender)
    return this.gender
  }
}

class Person1 extends Human1 {
  name: string

  constructor() {
    super()
    this.name = 'Max'
  }

  printMyName() {
    console.log(this.name)
    return this.name
  }
}
// `this`is set
const person2 = new Person1()
person2.printMyName() // ?
person2.printGender() // ?

// `this` is NOT set when assigning a class to a variable !!!
// that why using ES7 syntax IS better
const person3 = new Person1()
const p3 = person3.printMyName
const p4 = person3.printGender

// the code will blow up
p3()
p4()
