/* eslint-disable @typescript-eslint/no-unsafe-return */
// Don' use enums
export const shapes = {
  circle: 'circle',
  square: 'square',
} as const

type Shape = keyof typeof shapes

const resolveShape = (_shape: Shape) => ({})

resolveShape('circle') // auto-completes to "circle" and "square"

// /////////////////////////////////////////////////////////////////////

// source: [(32:29)](https://www.youtube.com/watch?v=ttUbH_JAHFI&t=736s&ab_channel=MattPocock&t=32m29s)
export const shapes2 = {
  circle: { shape: ['x', 'y', 'rx'] },
  square: ['x', 'y', 'height', 'width'],
} as const

type Shape2 = keyof typeof shapes2

const resolveShape2 = <T extends Shape>(_shape: Shape2): (typeof shapes2)[T] =>
  ({}) as any

const something = resolveShape2('square') // auto-completes to "circle" and "square"

// /////////////////////////////////////////////////////////////////////

// using arrays mapped type syntax
export const shapes3 = {
  circle: ['x', 'y', 'rx'],
  square: ['x', 'y', 'height', 'width'],
} as const
