type Separator = (repeat: number, stringToAdd?: string) => string

const separator: Separator = (repeat: number, stringToAdd?: string) => {
  if (stringToAdd) return `${Array(repeat).join(`${stringToAdd}`)}`
  return `${Array(repeat).join(' ')}`
}

// ///////////////////////////////////////

/* Non-functional way */

// ///////////////////////////////////////

// const padLeft1 = (text: string, repeat: number, stringToAdd?: string) => {
//   return `${ separator(repeat, stringToAdd) }${ text }`
// }

// const padRight1 = (text: string, repeat: number, stringToAdd?: string) => {
//   return `${ text }${ separator(repeat, stringToAdd) }`
// }

// let text = 'Lorem ipsum dolor sit amet consectetur.'

// let modifiedText = padLeft1(text, 4, '\n')//?
// let modifiedText2 = padRight1(text, 2, '\n')//?

// ///////////////////////////////////////

/* Functional way */

// ///////////////////////////////////////
type LeftOrRight = 'left' | 'right'
type PadParams = Parameters<typeof padLeft2>
type PadReturnType = ReturnType<typeof padLeftOrRight>

function padLeft2(textToModify: string, repeat: number, stringToAdd?: string) {
  return `${separator(repeat, stringToAdd)}${textToModify}`
}

function padRight2(textToModify: string, repeat: number, stringToAdd?: string) {
  return `${textToModify}${separator(repeat, stringToAdd)}`
}

function padLeftOrRight(leftOrRight: LeftOrRight, ...args: PadParams) {
  if (leftOrRight === 'left') return padLeft2(...args)
  return padRight2(...args)
}

const appFactory1 =
  <T extends (...args: any) => PadReturnType, U, V>(actionFn: T) =>
  (actionOptions: U) =>
  (...actionFnArguments: V) =>
    actionFn(actionOptions)(...actionFnArguments)

const padL = appFactory1<typeof padLeftOrRight, LeftOrRight, PadParams>(
  padLeftOrRight,
)('left')
const padR = appFactory1<typeof padLeftOrRight, LeftOrRight, PadParams>(
  padLeftOrRight,
)('right')

// const padL = padder('left')
// const padR = padder('right')

const text2 = 'Lorem ipsum dolor sit amet consectetur.'

padL(text2, 4, '\t') // ?
padR(text2, 5, '\n') // ?
