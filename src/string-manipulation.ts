type Foo<T extends string> = T extends `${infer Prefix}Bar` ? Prefix : never

//  You could even contrain the generic so that it can never be never.

type Foo2<T extends `${string}Bar`> = T extends `${infer Prefix}Bar`
  ? Prefix
  : never
type JustFoo = Foo<'fooBar'> // works but not the best
type ExpectErrorHere = Foo2<'nofoofoyoo'> // better because it throws an error as expected

export {}
