/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-promise-executor-return */
export type BrandedType<T, K> = T & { __brand: K }

const p = () => new Promise((res) => setTimeout(() => res('hello'), 1000))
const p2 = new Promise((res) => res('hello'))

type GetPromiseReturnType<T extends (...args: any) => Promise<unknown>> =
  Awaited<ReturnType<T>>
type Result1 = GetPromiseReturnType<typeof p>

type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer V>
  ? V extends Promise<unknown>
    ? MyAwaited<V>
    : V
  : never
type Result3 = MyAwaited<typeof p2>

type IsPromise<T> = T extends (...args: any) => Promise<any> ? true : false
type Result2 = IsPromise<typeof p>
export function invariant(condition: any, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

const obj = {
  name: 'John',
  age: 30,
  city: 'New York',
}

// loop through object properties and get their types as union
export type ExtractPropsFromObject<Type> = {
  [key in keyof Type]: Type[key]
}

export type Unwrap<T> = {
  [key in keyof T]: T[key]
} & {}

export type Inspect<T> = {
  [key in keyof T]: T[key]
}

export type ValuesOf<TObject extends Record<string, unknown>> = {
  [key in keyof TObject]: TObject[key]
}[keyof TObject]

export type KeysOf<TObject extends Record<string, unknown>> = {
  [K in keyof TObject]: K
}[keyof TObject]

export type UnionFromArray<T extends Array<any>> = T[number]

let a: UnionFromArray<[1, 2, 3]>

type ObjectValuesAsUnion<T> = {
  [key in keyof T]: T[keyof T]
}[keyof T]
type Test = ObjectValuesAsUnion<typeof obj>

type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<
    string & Property
  >}`]: () => Type[Property]
}

type Setters<Type> = {
  [Property in keyof Type as `set${Capitalize<
    string & Property
  >}`]: () => Type[Property]
}

export type CreateObjectAccessors<T> = Unwrap<Getters<T> & Setters<T>>
