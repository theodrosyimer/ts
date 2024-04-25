type AnyFunc = (...arg: any) => any

type PipeArgs<F extends AnyFunc[], Acc extends AnyFunc[] = []> = F extends [
  (...args: infer A) => infer B,
]
  ? [...Acc, (...args: A) => B]
  : F extends [(...args: infer A) => any, ...infer Tail]
    ? Tail extends [(arg: infer B) => any, ...any[]]
      ? PipeArgs<Tail, [...Acc, (...args: A) => B]>
      : Acc
    : Acc

type LastFnReturnType<F extends Array<AnyFunc>, Else = never> = F extends [
  ...any[],
  (...arg: any) => infer R,
]
  ? R
  : Else

export function pipe3<F extends AnyFunc[]>(
  arg: Parameters<F[0]>[0],
  ...fns: PipeArgs<F> extends F ? F : PipeArgs<F>
): LastFnReturnType<F, ReturnType<F[0]>> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return fns.slice(1).reduce((acc, fn) => fn(acc), fns[0](arg))
}

pipe(
  42,
  (x: number) => x.toString(),
  (x: number) => x + 2,
)
