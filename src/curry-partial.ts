/* Partial application: Binary to unary function */
type BinaryFunction<X> = (x: X, y: X | X[]) => X | X[]

type PartialApp<N> = (fn: BinaryFunction<N>, x: N) => (y: N | N[]) => N | N[]

type BinaryFunctionOnNumber = BinaryFunction<number>

const add2: BinaryFunctionOnNumber = (x: number, y: number | number[]) => {
  let sum = 0
  if (Array.isArray(y)) {
    sum = y.reduce((total: number, n: number) => total + n)
  }

  return x + sum
}

const mathPartial: PartialApp<number> =
  (fn: BinaryFunctionOnNumber, n: number) => (y: number | number[]) =>
    fn(n, y)

const addTwo = mathPartial(add2, 2)

addTwo([3, 4, 5])
addTwo(6)
addTwo(7)

type BinaryFunctionOnString = BinaryFunction<string>

const saySomethingToSomeone: BinaryFunctionOnString = (
  message: string,
  name: string | string[]
): string | string[] => {
  if (Array.isArray(name)) {
    return name.map(n => `${message} ${n}`)
  }
  return `${message} ${name}`
}

const messagePartial: PartialApp<string> =
  (fn: BinaryFunctionOnString, message: string) => (name: string | string[]) =>
    fn(message, name)

const sayHelloTo = messagePartial(saySomethingToSomeone, 'Hello')

sayHelloTo(['Theo', 'Yetu', 'Antoine']) // ?
sayHelloTo('Max') // ?

export {}
