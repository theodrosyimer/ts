export const get = async (url: string, input: Record<string, string>) =>
  fetch(`${url}?${new URLSearchParams(input).toString()}`)

export const post = async (url: string, input: Record<string, string>) =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(input),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer token',
    },
  })

export const put = async (url: string, input: Record<string, string>) =>
  fetch(url, {
    method: 'PUT',
    body: JSON.stringify(input),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer token',
    },
  })

export const patch = async (url: string, input: Record<string, string>) =>
  fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(input),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer token',
    },
  })

export const del = async (url: string, input: Record<string, string>) =>
  fetch(url, {
    method: 'DELETE',
    body: JSON.stringify(input),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer token',
    },
  })

type CreateAPIMethod = <TInput extends Record<string, string>, TOutput>(opts: {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
}) => (input: TInput) => Promise<TOutput>

const createAPIMethod: CreateAPIMethod = (opts) => (input) => {
  const method = methods[opts.method]

  return (
    method(opts.url, input)
      // Imagine error handling here...
      .then((res) => res.json())
  )
}

const methods = {
  GET: get,
  POST: post,
  PUT: put,
  PATCH: patch,
  DELETE: del,
} as const

/**
 * You can reuse this function as many times as you
 * like to create all your API methods!
 */
const getUser = createAPIMethod<
  { id: string }, // The input
  { name: string } // The output
>({
  method: 'GET',
  url: '/user',
})

// @ts-expect-error - The input is not a string
getUser({ id: 123 }) // All type safe!
