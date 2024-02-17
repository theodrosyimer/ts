// inspiration: [Check if a Value is a Promise using JavaScript | bobbyhadz](https://bobbyhadz.com/blog/javascript-check-if-value-is-promise)

// type GetPromiseReturnType<T> = T extends Promise<infer U> ? U : T
type GetPromiseReturnType<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>

type Result1 = Awaited<Promise<string>>
type Result2 = GetPromiseReturnType<() => Promise<string>>

type IsPromise<T> = T extends (...args: any) => Promise<any> ? true : false

const isPromise = <T extends Promise<T>>(p: T) => {
  if (
    typeof p === 'object' &&
    typeof p.then === 'function' &&
    typeof p.catch === 'function'
  ) {
    return true
  }

  return false
}

const returnsPromise = <T extends (...args: any) => Promise<unknown> | any>(
  fn: T,
) => {
  if (
    fn.constructor.name === 'AsyncFunction' ||
    (typeof fn === 'function' && isPromise(fn()))
  ) {
    console.log('✅ Function returns promise')
    return true
  }

  console.log('⛔️ Function does NOT return promise')
  return false
}

// 👇️ Examples
const exampleAsync = async () => {}
const example = () => {}
const examplePromise = () =>
  new Promise((resolve) => {
    resolve(42)
  })

type R = GetPromiseReturnType<typeof examplePromise>
console.log(returnsPromise(exampleAsync)) // 👉️ true
console.log(returnsPromise(example)) // 👉️ false
console.log(returnsPromise(examplePromise)) // 👉️ true

export {}
