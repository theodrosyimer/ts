// When to use  static private methods?
// Private methods are useful when you want to:
//   - validate the value of a private field before setting it
//   - when using an aggregate class and don't want to expose the  static private methods
//   - when you want to use a static private method inside a public method
//   - when you want to use a static private method inside another private method

class Person {
  #firstName

  #lastName

  constructor(firstName: string, lastName: string) {
    this.#firstName = Person.#validate(firstName)
    this.#lastName = Person.#validate(lastName)
  }

  getFullName(format = true) {
    return format ? this.#firstLast() : this.#lastFirst()
  }

  static #validate(name: string) {
    const str = name.trim()
    if (str.length >= 3) {
      return str
    }
    throw new Error('The name must be a string with at least 3 characters')
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
