/* eslint-disable no-empty-pattern */
type Methods = {
  eq: (value: number) => boolean
}

function queryBuilder() {
  const methods: Methods = {}
  const id = 1
  function eq(value: number) {
    return id === value
  }

  return {
    where(cb: (methods: Methods) => void) {
      return cb(methods)
    },
  }
}

queryBuilder().where(({}) => ({}))
