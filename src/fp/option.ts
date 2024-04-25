export type Option<T> = null | { value: T }

export function none<T>(): Option<T> {
  return null
}

export function some<T>(value: T): Option<T> {
  return { value }
}

export function fromNullable<T>(x: T) {
  return x != null ? some(x) : none()
}
