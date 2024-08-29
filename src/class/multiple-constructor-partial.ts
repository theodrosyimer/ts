// source: [How To Add Multiple Constructors In TypeScript?](https://timmousk.com/blog/typescript-multiple-constructors/)
class MyClass {
  public p1 = ''

  public p2 = 0

  public static fromOneValue(p1: string): MyClass {
    const cls = new MyClass()
    cls.p1 = p1
    return cls
  }

  public static fromTwoValues(p1: string, p2: number): MyClass {
    const cls = new MyClass()
    cls.p1 = p1
    cls.p2 = p2
    return cls
  }
}

const cls1 = MyClass.fromOneValue('Tim')
const cls2 = MyClass.fromTwoValues('Tim', 27)
