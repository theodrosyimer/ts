function isNonNullish<T>(value: T): value is T & NonNullable<unknown> {
  return value !== null && value !== undefined
}
