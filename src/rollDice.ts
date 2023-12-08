import { randomMinMax } from './randomizer.js'

type _Range<T extends number, R extends unknown[]> = R['length'] extends T
  ? R[number]
  : _Range<T, [R['length'], ...R]>

type Range<T extends number> = number extends T ? number : _Range<T, []>

type DiceResult<T> = Extract<DiceValues, T>

type Dice = Exclude<Range<7>, 0>

type DiceValues = 1 | 2 | 3 | 4 | 5 | 6

const diceValues = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
}

export const rollTheDice = () => {
  const value = randomMinMax(1, 6) as DiceValues
  return value
}

export const rollTheDice2 = () => {
  const value = randomMinMax(1, 6)
  const isDiceValue = (n: number): n is DiceValues => n >= 1 && n <= 6
  if (isDiceValue(value)) {
    return value
  }
  const _ensure: never = value
  return _ensure
}

/**
 * @link [TypeScript: Type predicates](https://fettblog.eu/typescript-type-predicates/)
 */
export const rollTheDice3 = () => {
  const value = randomMinMax(1, 6)
  const isDiceValue = (n: number): n is DiceValues => n >= 1 && n <= 6
  if (isDiceValue(value)) {
    switch (value) {
      case 1:
        return value
      case 2:
        return value
      case 3:
        return value
      case 4:
        return value
      case 5:
        return value
      case 6:
        return value
      default:
        break
    }
  }
  const _ensure: never = value
  return _ensure
}

const a = rollTheDice() /*?. $*/
const b = rollTheDice2() /*?. $*/
const c = rollTheDice3() /*?. $*/

export {}
