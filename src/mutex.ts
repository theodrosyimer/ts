// TypeScript version of: [Limiting concurrency with promises](https://blog.battlefy.com/limiting-concurrency-with-promises)
const Mutex = () => {
  let semaphore: Promise<void> | undefined
  let unlock: ((value: void | PromiseLike<void>) => void) | undefined

  const acquire = async () => {
    await semaphore
    semaphore = new Promise((resolve) => {
      unlock = resolve
    })
  }

  const release = () => {
    unlock?.()
    semaphore = undefined
    unlock = undefined
  }

  return async (closure: (...args: any[]) => unknown) => {
    try {
      await acquire()
      return closure()
    } finally {
      release()
    }
  }
}

// const someCommandMutex = Mutex()

// app.get(async (req, res, next) => {
//   ...
//   await someCommandMutex(async () => {
//     const {stdout} = await exec('some-command');
//     ...
//   });
//   ...
// });
