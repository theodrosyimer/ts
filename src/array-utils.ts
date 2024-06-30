import { randomMinMax } from './randomizer.js'

export function firstHalveIndex(arr: unknown[]) {
  return [0, Math.ceil(arr.length / 2)]
}

export function secondHalveIndex(arr: unknown[]) {
  return [Math.ceil(arr.length / 2), arr.length]
}
export function firstHalve(arr: unknown[]) {
  return arr.slice(0, Math.ceil(arr.length / 2))
}

export function secondHalve(arr: unknown[]) {
  return arr.slice(Math.ceil(arr.length / 2), arr.length)
}

export function randomFromArrayFirstHalve(arr: unknown[]) {
  return arr[randomMinMax(0, Math.ceil(arr.length / 2))]
}

export function randomFromArraySecondHalve(arr: unknown[]) {
  return arr[randomMinMax(Math.ceil(arr.length / 2), arr.length)]
}
