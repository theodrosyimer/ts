/* eslint-disable no-empty-pattern */
type WhereOptions = {
  eq: (value: number) => boolean
}

function wrap() {
  const id = 1
  function eq(value: number) {
    return id === value
  }

  return {
    where(cb: (opts: WhereOptions) => void) {
      return cb(opts)
    },
  }
}

wrap().where(({}) => ({}))
