const identity = <T>(val: T) => val

const a = 'efg'

const result = identity('abcd') // ?
const result2 = identity('efgh') /*?*/
const result3 = identity('abcd') /*?.*/
const result4 = identity('abcd') /*? ($ + a) */
const result5 = identity('abcd') /*? ($ + a).toUpperCase() */

export {}
