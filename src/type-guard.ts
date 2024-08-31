export function isNonNullish<T>(value: T): value is T & NonNullable<unknown> {
  return value !== null && value !== undefined
}

export function isNonNullable(value: any) {
  return value !== null && value !== undefined
}

export function isArray(value: any) {
  return Array.isArray(value)
}

export function isObject(value: any) {
  return value !== null && !Array.isArray(value) && typeof value === 'object'
}

export function isFunction(value: any) {
  return typeof value === 'function'
}

export function isString(value: any) {
  return typeof value === 'string'
}

export function isNumber(value: any) {
  return typeof value === 'number'
}

export function isBoolean(value: any) {
  return typeof value === 'boolean'
}

export function isSymbol(value: any) {
  return typeof value === 'symbol'
}

export function isBigInt(value: any) {
  return typeof value === 'bigint'
}

export function isUndefined(value: any) {
  return value === undefined
}

export function isNull(value: any) {
  return value === null
}

export function isPrimitiveValue(value: any) {
  return (
    isString(value) ||
    isNumber(value) ||
    isBoolean(value) ||
    isSymbol(value) ||
    isBigInt(value) ||
    isUndefined(value) ||
    isNull(value)
  )
}

export function isReferenceValue(value: any) {
  return isObject(value) || isArray(value)
}
