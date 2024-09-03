const o = { apikey: '0123456789', name: 'John Doe' }
type Key = keyof typeof o
function inferObject<T extends Record<Key, V>, V extends string>(obj: T) {
  return obj
}

const oTyped = inferObject({ apikey: '0123456789', name: 'John Doe' })

export {}
