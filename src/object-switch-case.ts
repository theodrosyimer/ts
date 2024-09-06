/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable dot-notation */

import { strict as assert } from 'node:assert'
import { it } from 'node:test'

type DeepWritablePartial<T> = {
  -readonly [Key in keyof T]+?: T[Key] extends object
    ? DeepWritablePartial<T[Key]>
    : T[Key]
}

const flagsDefault = {
  feature1: true,
  feature2: false,
} as const

type FlagsDefault = typeof flagsDefault

function updateFlags(flagsOptions: DeepWritablePartial<FlagsDefault>) {
  const o = structuredClone(flagsOptions)
  switch (true) {
    case o['feature1']:
      o['feature1'] = true
      break
    default:
      throw new Error('Unknown feature flag')
  }

  return o
}

it('object-switch-case', () => {
  assert.deepStrictEqual(updateFlags({ feature1: true }), { feature1: true })
})
