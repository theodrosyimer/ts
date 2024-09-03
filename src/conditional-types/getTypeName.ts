/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
type TypeName<T> = T extends string
  ? 'string'
  : T extends number
    ? 'number'
    : T extends boolean
      ? 'boolean'
      : T extends undefined
        ? 'undefined'
        : T extends symbol
          ? 'symbol'
          : T extends bigint
            ? 'bigint'
            : T extends (...args: any) => unknown
              ? 'function'
              : T extends Array<unknown>
                ? 'array'
                : T extends null
                  ? 'null'
                  : T extends Date
                    ? 'date'
                    : object

export const getTypeName = <T>(value: T): TypeName<T> => {
  if (value === null) return 'null' as TypeName<T>
  if (value instanceof Function) return 'function' as TypeName<T>
  if (value instanceof Array) return 'array' as TypeName<T>
  if (value instanceof Date) return 'date' as TypeName<T>

  // It MUST be the last condition to check
  // because Function, Array, Date are also Object
  // so we need to filter out those before
  if (value instanceof Object) return 'object' as TypeName<T>

  return typeof value as TypeName<T>
}

const object = {
  count: 1,
  read: 2,
  phrase: 'hello world',
}
const array = ['world', 'ok', 'hello', 2, '3']
const fn = () => console.log('hello')
const s = getTypeName('hello') // ?
const n = getTypeName(1) // ?
const bi = getTypeName(BigInt(15058625)) // ?
const b = getTypeName(true) // ?
const sy = getTypeName(Symbol('test')) // ?
const f = getTypeName(fn) // ?
const a = getTypeName(array) // ?
const o = getTypeName(object) // ?
const d = getTypeName(new Date()) // ?
const nu = getTypeName(null) // ?

console.log(f) // ?
