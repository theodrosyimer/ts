type Bar = {
  value: number
}

type Foo = {
  bar: Bar
}

function add(foo: Foo, b: number): number {
  return foo.bar.value + b
}

const bar: Bar = { value: 1 }
const foo: Foo = { bar }
bar.value = 2

const result = add(foo, 3)

console.log(result)
