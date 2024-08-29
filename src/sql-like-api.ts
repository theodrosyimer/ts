/* eslint-disable no-empty-pattern */
type Methods = typeof methods

const methods = {
  eq(value1: unknown, value2: unknown) {
    return value1 === value2
  },
} as const

function queryBuilder<const T extends Record<string, unknown>>() {
  return {
    where(cb: (methods: Methods) => void) {
      return cb(methods)
    },
  }
}

function buildQueryBuilder<const T extends Record<string, unknown>>() {
  return queryBuilder<T>()
}

const myQueryBuilder = buildQueryBuilder()

myQueryBuilder.where(({}) => ({}))
