/** Curry: Unary to unary function */
type intToIntCurry = (x: number) => (y: number) => number
const add: intToIntCurry = (x: number) => (y: number) => x + y

const addOne = add(1)

addOne(1) //?
addOne(6) //?
addOne(7) //?
