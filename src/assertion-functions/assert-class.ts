// source: [Use assertion functions inside classes | Total TypeScript](https://www.totaltypescript.com/tips/use-assertion-functions-inside-classes)
export class SDK {
  #repository: Repository
  loggedInUserId?: string | undefined

  constructor(loggedInUserId?: string) {
    this.#repository = new Repository()
    this.loggedInUserId = loggedInUserId
  }

  createPost(title: string) {
    this.assertUserIsLoggedIn()

    this.#repository.createPost(this.loggedInUserId, title)
  }

  assertUserIsLoggedIn(): asserts this is this & {
    loggedInUserId: string
  } {
    if (this.loggedInUserId) {
      throw new Error('User is not logged in')
    }
  }
}

class Repository {
  createPost(userId: string, title: string) {
    console.log(`Creating post ${title} for user ${userId}`)
  }
}
