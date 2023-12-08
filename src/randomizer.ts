/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
export type Randomizer =
  | ((max?: number) => number)
  | ((min?: number, max?: number) => number)

export const random = (max?: number) =>
  max != null ? Math.round(Math.random() * max) : Math.random()

const random2 = (max?: number) =>
  max != null ? Math.floor(Math.random() * (max + 1)) : Math.random()

export const randomMinMax = (min = 0, max = 0) =>
  Math.max(Math.round(Math.random() * max), min)

const randomMinMax2 = (min = 0, max = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const getRandomBooleanFromPercentage = (percentage: number) =>
  Math.random() < percentage / 100

export const randomBetween = <T, U>(first: T, second: U): T | U =>
  randomMinMax(0, 1) === 0 ? first : second

export const headOrTails = () => randomBetween('heads', 'tails')

export const maybeNullishOr = <T>(value: T) =>
  randomBetween(value, randomBetween(null, undefined))

export const maybeTrueOrFalse = () => randomBetween(true, false)

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
