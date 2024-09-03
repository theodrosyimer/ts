// see: [TScript: Documentation - Mapped Ts](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)

export type UnWrap<T> = {
  [key in keyof T]: T[key]
}

// see: [TScript: Documentation - Mapped Ts - Key Remapping via `as`](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as)

/*
 * syntax example
 MappedTWithNewProperties<T> = {
  [Properties in keyof T as NewKeyT]: T[Properties]
}
*/

// example
type Getters<T> = {
  [key in keyof T as `get${Capitalize<string & key>}`]: () => T[key]
}

// example
type Setters<T> = {
  [key in keyof T as `set${Capitalize<string & key>}`]: () => T[key]
}

interface Person {
  name: string
  age: number
  location: string
}

export type CreateObjectAccessors<T> = Getters<T> & Setters<T>

export type LazyPerson = UnWrap<CreateObjectAccessors<Person>>

// * LazyPerson remapped to:
// type LazyPerson = {
//   getName: () => string
//   getAge: () => number
//   getLocation: () => string
// }
