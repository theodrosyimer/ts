async function retry<T>(fn: () => Promise<T>, retries = 5): Promise<T> {
  try {
    return await fn()
  } catch (err) {
    if (retries === 0) {
      throw err
    }
    console.log('Retries left', retries)
    return retry(fn, retries - 1)
  }
}

retry(() => Promise.reject(new Error('fail'))) /*?*/
retry(() => Promise.resolve('ok')).then((str) => {
  console.log('str', str) /*?*/
})
