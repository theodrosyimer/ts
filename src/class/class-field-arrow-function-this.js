/*
Make `this` keyword having a behaviour that we expect:
- when using closures
*/
class MyClass {
  myProperty = 10

  myFunction = () => {
    console.log(this instanceof MyClass)
  }
}

const myInstance = new MyClass()
const { myFunction, myProperty } = myInstance

// eslint-disable-next-line no-unused-expressions
myProperty

// eslint-disable-next-line no-unused-expressions
myFunction()

// Even works with closures
const clos = myFunction
clos()

/*
It was not the case using arrow functions and `this` keyword, specially with closures
*/
const myObject = {
  myFunction() {
    console.log(this === myObject)
    console.log(this === global)
  }
}

myObject.myFunction()

/*
It returns `false` because of the way an arrow function works, `this` will refer to global scope in which it was called.
So, when using a closure from the object's method and calling it in the global scope, in the example below, `this` will bind to the `global` scope.
*/
const myFunc = myObject.myFunction
myFunc()
