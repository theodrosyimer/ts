// from [TypeScript Template Literal Type - how to infer numeric type? - Stack Overflow](https://stackoverflow.com/questions/69089549/typescript-template-literal-type-how-to-infer-numeric-type/69090186#69090186)

type MAXIMUM_ALLOWED_BOUNDARY = 999

type Mapped<
  N extends number,
  Result extends Array<unknown> = [],
  > =
  (Result['length'] extends N
    ? Result
    : Mapped<N, [...Result, Result['length']]>
  )

type NumberRange = Mapped<MAXIMUM_ALLOWED_BOUNDARY>[number]

type Dictionary = {
  [Prop in NumberRange as `${Prop}`]: Prop
}

// from: [typescript - Is it possible to restrict number to a certain range - Stack Overflow](https://stackoverflow.com/questions/39494689/is-it-possible-to-restrict-number-to-a-certain-range)

type Ran<T extends number> = number extends T ? number : _Range<T, []>;
type _Range<T extends number, R extends unknown[]> = R['length'] extends T ? R[number] : _Range<T, [R['length'], ...R]>;

// from: [typescript - Is it possible to restrict number to a certain range - Stack Overflow](https://stackoverflow.com/questions/39494689/is-it-possible-to-restrict-number-to-a-certain-range)

type PrependNextNum<A extends Array<unknown>> = A['length'] extends infer T ? ((t: T, ...a: A) => void) extends ((...x: infer X) => void) ? X : never : never;

type EnumerateInternal<A extends Array<unknown>, N extends number> = { 0: A, 1: EnumerateInternal<PrependNextNum<A>, N> }[N extends A['length'] ? 0 : 1];

export type Enumerate<N extends number> = EnumerateInternal<[], N> extends (infer E)[] ? E : never;

export type Range<FROM extends number, TO extends number> = Exclude<Enumerate<TO>, Enumerate<FROM>>;

type E1 = Enumerate<43>;

type E2 = Enumerate<10>;

type R1 = Range<1, 5>;

type R2 = Range<0, 43>;
