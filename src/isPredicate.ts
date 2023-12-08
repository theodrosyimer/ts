type Predicate<T> = (x: T) => boolean
// type ReturnBoolean = ReturnType<() => boolean>

const isNumber1: Predicate<number> = (x: number) => typeof x === 'number'

console.log(`isNumber: ${isNumber1(5)}`)

// ///////////////////////////////////////

/* Without Generics */

// ///////////////////////////////////////

type Predicate2 = (x: unknown) => boolean
type K = ReturnType<Predicate2>

const isNumber2: Predicate2 = (x: unknown): K => typeof x === 'number'

console.log(`isNumber2: ${isNumber2('5')}`)
