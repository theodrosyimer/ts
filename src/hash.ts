/* eslint-disable no-bitwise */
function hash(s: string) {
  for (var i = 0, h = 9; i < s.length; ) h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9)
  return `${h ^ (h >>> 9)}`
}

hash('hello') /*?. $*/
