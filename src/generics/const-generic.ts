export function hello<const T extends string>(name: T) {
  return `Hello ${name}!` as const
}
const message = hello('world')
