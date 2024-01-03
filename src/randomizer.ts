/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
export type Randomizer =
  | ((max?: number) => number)
  | ((min?: number, max?: number) => number)

export function random(max?: number): number {
  return max != null ? Math.round(Math.random() * max) : Math.random()
}

export function random2(max?: number): number {
  return max != null ? Math.floor(Math.random() * (max + 1)) : Math.random()
}

export function randomMinMax(min = 0, max = 0): number {
  return Math.max(Math.round(Math.random() * max), min)
}

export function randomMinMax2(min = 0, max = 0): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomBooleanFromPercentage(percentage: number): boolean {
  return Math.random() < percentage / 100
}

export function randomBetween<T, U>(first: T, second: U): T | U {
  return randomMinMax(0, 1) === 0 ? first : second
}

export function headOrTails(): string {
  return randomBetween('heads', 'tails')
}

export function maybeNullishOr<T>(value: T): T | null | undefined {
  return randomBetween(value, randomBetween(null, undefined))
}

export function maybeTrueOrFalse(): boolean {
  return randomBetween(true, false)
}

random() /*?. $*/
random2() /*?. $*/
random(3) /*?. $*/
random2(3) /*?. $*/
getRandomBooleanFromPercentage(50) /*?. $*/
randomMinMax() /*?. $*/
randomMinMax2() /*?. $*/
randomMinMax(3, 8) /*?. $*/
randomMinMax2(3, 8) /*?. $*/

const ht = headOrTails() /*?. $*/
maybeNullishOr('Im a value') /*?. $*/
maybeTrueOrFalse() /*?. `${$}`*/
