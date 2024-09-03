// When to use private methods?
// Private methods are useful when you want to:
//   - validate the value of a private field before setting it
//   - when using an aggregate class and don't want to expose the private methods
//   - when you want to use a private method inside a public method
//   - when you want to use a private method inside another private method

class Person {
  #firstName

  #lastName

  constructor(firstName: string, lastName: string) {
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

const person = new Person('John', 'Doe')
console.log(person.getFullName())
