// source: [How To Add Multiple Constructors In TypeScript?](https://timmousk.com/blog/typescript-multiple-constructors/)

class Student {
  public name = ''

  public id = 0

  public static register(newStudentInfos: Omit<Student, 'id'>): Student {
    const student = new Student()
    student.name = newStudentInfos.name
    student.id++
    return student
  }
}

const registeredStudent = Student.register({ name: 'Tim' })
