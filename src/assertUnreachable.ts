/* eslint-disable default-case */
const colors = ['red', 'green', 'blue', 'purple'] as const

function toRGB(color: (typeof colors)[number]) {
  switch (color) {
    case 'red':
      return '#FF0000'
    case 'green':
      return '#00FF00'
    case 'blue':
      return '#0000FF'
    // case 'purple':
    //   return '#800080'
  }
  // color satisfies never
  // or
  assertUnreachable(color)
}

/**
 * @see [assertUnreachable techniques with Ryan from the TypeScript team - YouTube](https://www.youtube.com/watch?v=93RA21QfqIo&ab_channel=MichiganTypeScript)
 * @param x - value that should not be reachable
 * @param [message='This should not be reachable']  - message to be thrown
 */
function assertUnreachable(x: never, message = 'This should not be reachable') {
  throw new Error(`${message} ${x}`)
}
