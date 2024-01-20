/**
 * Class with private constructor
 * @see [Private properties - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties#simulating_private_constructors)
 */
class PrivateConstructor {
  static #isInternalConstructing = false

  constructor() {
    if (!PrivateConstructor.#isInternalConstructing) {
      throw new TypeError('PrivateConstructor is not constructable')
    }
    PrivateConstructor.#isInternalConstructing = false
    // More initialization logic
  }

  static create() {
    PrivateConstructor.#isInternalConstructing = true
    const instance = new PrivateConstructor()
    return instance
  }
}

new PrivateConstructor() // TypeError: PrivateConstructor is not constructable
PrivateConstructor.create() // PrivateConstructor {}
