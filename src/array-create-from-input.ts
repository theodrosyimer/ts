const makeArrayFromInput = <T>(...args: T[]) =>
  Array.prototype.slice.call(args) as T[]

makeArrayFromInput(1, 2, 3) /*?*/
makeArrayFromInput('1', '2', '3') /*?*/
