const o = { apikey: '0123456789', name: 'John Doe' }
type Key = keyof typeof o
function inferObject<T extends Record<Key, V>, V extends string>(obj: T) {
  return obj
}

function inferReadOnlyObject<const T extends Record<any, any>>(obj: T) {
  return obj
}

const oTyped = inferObject({ apikey: '0123456789', name: 'John Doe' })
const oTyped2 = inferReadOnlyObject({ apikey: '0123456789', name: 'John Doe' })

function inferKey<T extends Record<any, any>, K extends keyof T>(
  obj: T,
  key: K,
) {
  return obj[key]
}

// only return the type and not the literal value
const oTyped3 = inferKey(o, 'name')

export {}
