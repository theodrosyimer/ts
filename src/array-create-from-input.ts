const makeArrayFromInput = <T>(...args: T[]) => args.slice()

makeArrayFromInput(1, 2, 3) /*?*/
makeArrayFromInput('1', '2', '3') /*?*/
