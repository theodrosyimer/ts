class IncreasingCounter {
  // private field
  #count = 0

  // public field
  person = 'Theo'

  get value() {
    console.log('Getting the current value!')
    return `${this.person}: ${this.#count}`
  }

  increment() {
    this.#count++
  }
}

const counter = new IncreasingCounter()

// Accessing a public field
console.log(counter.person) // ?

// We can't acces the private field #count, it returns undefined
console.log(counter.count) // ?

// Accessing a public method
console.log(counter.value) // ?

// Trying to access the private field `#count` value via the public method ìncrement()`
console.log(counter.increment()) // ?

// Accessing the new value of `counter.value` after incrementing it
console.log(counter.value) // ?

///////////////////////////////////////////////////////////////////

class Person {
  #firstName
  #lastName
  constructor(firstName, lastName) {
    this.#firstName = firstName
    this.#lastName = lastName
  }
  getFullName(format = true) {
    return format ? this.#firstLast() : this.#lastFirst()
  }

  #firstLast() {
    return `${this.#firstName} ${this.#lastName}`
  }
  #lastFirst() {
    return `${this.#lastName}, ${this.#firstName}`
  }
}

let person = new Person('John', 'Doe')
console.log(person.getFullName())
