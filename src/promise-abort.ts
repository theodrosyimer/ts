export async function promiseRaceAbort(
  fns: (() => Promise<any>)[],
  maxTimeOut = 5000,
) {
  const abortController = new AbortController()
  const { signal } = abortController

  // add the same abort controller to each promise
  fns.forEach((promise) => {
    promise.bind({ signal })
  })

  fns.push(
    () =>
      new Promise((_, reject) => {
        setTimeout(reject, maxTimeOut)
      }),
  )

  try {
    return Promise.race(fns)
  } catch (error) {
    abortController.abort()
    console.log('promiseAbortRace error', error)
    return []
  }
}

export async function promiseAllAbort(
  fns: (() => Promise<any>)[],
  maxTimeOut = 5000,
) {
  const abortController = new AbortController()
  const { signal } = abortController

  // add the same abort controller to each promise
  fns.forEach((promise) => {
    promise.bind({ signal })
  })

  fns.push(
    () =>
      new Promise((_, reject) => {
        setTimeout(reject, maxTimeOut)
      }),
  )

  try {
    return Promise.all(fns)
  } catch (error) {
    abortController.abort()
    console.log('promiseAbortRace error', error)
    return []
  }
}
