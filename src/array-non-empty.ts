import type { NonEmptyArray } from './utility-types.ts'

// @ts-expect-error - should not allow empty array
const arr1: NonEmptyArray<number> = []
const arr2: NonEmptyArray<number> = [1, 2, 3]
