// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
type Currying<T extends unknown, R, Args extends unknown[] = []> = T extends [
  infer Head,
]
  ? (...args: [...Args, Head]) => R
  : T extends [infer Head, ...infer Tail]
    ? ((...args: [...Args, Head]) => Currying<Tail, R>) &
        Currying<Tail, R, [...Args, Head]>
    : () => R

declare function currying<T extends unknown[], R>(
  fn: (...args: T) => R,
): Currying<T, R>

function add(x: number, y: number) {
  return x + y
}

const addCurried = currying(add)
const add1 = addCurried(1)
