type Predicate1<T> = (value: T) => boolean
type Filter = <T>(predicate: Predicate1<T>) => (array: T[]) => T[]

const filter: Filter =
  <T>(predicate: Predicate1<T>) =>
  (arr: T[]) =>
    arr.filter(predicate)

const evenFilter = (x: number) => x % 2 === 0

// const isEven = is(evenFilter)

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const arr2 = [1, 2, 3, '4', 5, 6, 7, 8, 9, 10]

const isEven = filter(evenFilter)

isEven(arr) /*?*/

// @ts-expect-error there is a string in the array
isEven(arr2) /*?*/
