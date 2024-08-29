// source: [How To Add Multiple Constructors In TypeScript?](https://timmousk.com/blog/typescript-multiple-constructors/)
// The disadvantage of this method is that since you can pass any argument you want, you can omit a required parameter.
class MyClass {
  private p1 = ''

  private p2 = 0

  constructor(params: Partial<MyClass>) {
    Object.assign(this, params)
  }
}

const cls1 = new MyClass({ p1: 'Tim' })
const cls2 = new MyClass({ p1: 'Tim', p2: 27 })
