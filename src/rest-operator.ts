/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unsafe-call */
type LeftOrRight = 'left' | 'right'
type PadParams = Parameters<typeof padLeft2>
type PadReturnType = ReturnType<typeof padLeftOrRight>

// can type all the remaining parameters from the rest operator!
function padLeftOrRight(leftOrRight: LeftOrRight, ...args: PadParams) {
  if (leftOrRight === 'left') return padLeft2(...args)
  return padRight2(...args)
}

// /////////////////////////////////////

// not important for the example
type Separator = (repeat: number, stringToAdd?: string) => string

const separator: Separator = (repeat: number, stringToAdd?: string) => {
  if (stringToAdd) return `${Array(repeat).join(`${stringToAdd}`)}`
  return `${Array(repeat).join(' ')}`
}

function padLeft2(textToModify: string, repeat: number, stringToAdd?: string) {
  return `${separator(repeat, stringToAdd)}${textToModify}`
}

function padRight2(textToModify: string, repeat: number, stringToAdd?: string) {
  return `${textToModify}${separator(repeat, stringToAdd)}`
}
