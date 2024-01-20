/**
 *  TODO 'Use a Transducer to process the string'
 *
 */

const capitalizeArrayOfWords = (arr: string[]) =>
  arr
    .map(
      (x: string) =>
        `${x.substring(0, 1).toUpperCase()}${x.substring(1).toLowerCase()}`,
    )
    .join('')

export const toCamelCase = (string: string): string | Error => {
  if (typeof string !== 'string') {
    return new Error(`Expected: an input of type 'string', Received: ${string}`)
  }

  const arrayOfWords = string
    .slice()
    .replace(/\n | \t/, ' ')
    .split(' ')
  if (arrayOfWords.length === 1) return string.toLowerCase()

  const [first, ...rest] = arrayOfWords
  return `${first?.toLowerCase()}${capitalizeArrayOfWords(rest)}`
}

export function toCamelCase2(str: string) {
  if (str.includes('_')) {
    const [start, ...rest] = str.split('_')
    return `${start}${capitalizeArrayOfWords(rest)}`
  }
  return str
}
toCamelCase2('first_name_test') /*? .$*/

const [ex0, ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8] = [
  'first_name',
  'MulTiple   spaCEs  tEst',
  'newline \n tEst',
  'TAB \t tEst',
  'TEst',
  'TEst et uN',
  'TeSt deuX',
  'TEst et troiS',
  'TeSt quAtre fIN',
]

// try {
//   toCamelCase(undefined) /*? .$*/
// } catch (error) {
//   // console.log(error)
// } /*? .$*/

// toCamelCase() /*?. $ */
// toCamelCase(undefined) /*? .$*/
// toCamelCase(null) /*? .$*/
// toCamelCase(1) /*? .$*/
// toCamelCase([1]) /*? .$*/
// toCamelCase([]) /*? .$*/
// toCamelCase({}) /*? .$*/
toCamelCase('') /*? .$*/
toCamelCase(' ') /*? .$*/
toCamelCase(ex0) /*? .$*/
toCamelCase(ex1) /*? .$*/
toCamelCase(ex2) /*? .$*/
toCamelCase(ex3) /*? .$*/
toCamelCase(ex4) /*? .$*/
toCamelCase(ex5) /*? .$*/
toCamelCase(ex6) /*? .$*/
toCamelCase(ex7) /*? .$*/
toCamelCase(ex8) /*? .$*/

// toCamelCase(`[
//   {
//     "id": 1,
//     "first_name": "Ardyce",
//     "last_name": "Blease",
//     "email": "ablease0@nhs.uk",
//     "gender": "Female",
//     "ip_address": "253.125.93.201"
//   },
//   {
//     "id": 2,
//     "first_name": "Talia",
//     "last_name": "Dellenbrok",
//     "email": "tdellenbrok1@unc.edu",
//     "gender": "Female",
//     "ip_address": "198.80.232.175"
//   },
//   {
//     "id": 3,
//     "first_name": "Reed",
//     "last_name": "Galiero",
//     "email": "rgaliero2@dedecms.com",
//     "gender": "Male",
//     "ip_address": "222.143.127.104"
//   }
// ]
// `) /*?*/
