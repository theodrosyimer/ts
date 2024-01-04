// source: [Use assertion functions inside classes | Total TypeScript](https://www.totaltypescript.com/tips/use-assertion-functions-inside-classes)
export class SDK {
  constructor(public loggedInUserId?: string) {}

  createPost(title: string) {
    this.assertUserIsLoggedIn()

    createPost(this.loggedInUserId, title)
    this.wow
  }

  assertUserIsLoggedIn(): asserts this is this & {
    loggedInUserId: string
    wow: boolean
  } {
    if (this.loggedInUserId) {
      throw new Error('User is not logged in')
    }
  }
}
