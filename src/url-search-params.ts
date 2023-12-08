/* eslint-disable no-unused-expressions */
const params = new URL(document.location.href).searchParams

params.set('v', 'test')
params.get('v')

for (const [key, value] of params) {
  console.log(key, value)
}

/* ************************************************ */
/* ************************************************ */
/**
 * Function that returns URLSearchParams from an `URL` instance or a `string` that is converted to an `URL` instance.
 *
 * @param url `string` or `URL` instance
 * @throws if `url` is not a `string` or an `URL` object
 *
 * ### Example
 * ```ts
 * const [urlObject, urlParams] = useUrl('url/path')
 * // or
 * const [urlObject, urlParams] = useUrl(new URL('url/path'))
 * ```
 */

function useUrl(url: string | URL) {
  if (!(typeof url === 'string' || url instanceof URL)) {
    throw new Error(
      `Expected a string or a URL object, received ${JSON.stringify(url)}`,
    )
  }

  if (url instanceof URL) {
    return [url, url.searchParams] as const
  }

  const newUrl = new URL(url)
  return [newUrl, newUrl.searchParams] as const
}

// eslint-disable-next-line react-hooks/rules-of-hooks
const [myUrl, myUrlParams] = useUrl(
  new URL(/* 'world',  */ 'https://google.com/search/test?test=hello'),
)

// if reassignment is needed, use `let` instead of `const`
// // eslint-disable-next-line react-hooks/rules-of-hooks
// let [myUrl, myUrlParams] = useUrl(new URL(/* 'world',  */'https://google.com/search/test?test=hello'))
const userId = 1
myUrlParams.set('q', `${userId} is:issue repo:facebook/react-native`)

myUrlParams.get('q')
myUrlParams.get('test')

for (const [key, value] of myUrlParams) {
  console.log(key, value)
}

// can be reassigned if `let` is used instead of `const` like shown above
// [myUrl] = useUrl(new URL(/* 'world',  */'http://example.com:8080/pathname/?search=test#hash'))

myUrl.origin
myUrl.pathname
myUrl.href
myUrl.search
myUrl.searchParams
myUrl.pathname.split('/').filter(Boolean)

/* ************************************************ */
/* ************************************************ */

// everything needs to be a string to be passed to URLSearchParams
const user = {
  id: '1',
  name: 'John',
  surname: 'Doe',
  age: '30',
}

const urlObjectFromObject = new URLSearchParams(user)
urlObjectFromObject.get('id')

const queryStringEncoded2 = urlObjectFromObject.toString()
queryStringEncoded2

/* ************************************************ */
/* ************************************************ */

const urlObjectFromTemplateString = new URLSearchParams(
  `q=${userId} is:issue repo:facebook/react-native`,
)
urlObjectFromTemplateString.get('q')

const queryStringEncoded = urlObjectFromTemplateString.toString()
queryStringEncoded

/* ************************************************ */
/* ************************************************ */

// can be passed as literal, like a Map, but with only string keys and values
// could come from an object converted with `Object.entries(object)` to an array of tuples
const urlObjectFromStringTuples = new URLSearchParams([
  ['string', 'array'],
  ['of', 'strings'],
])
urlObjectFromStringTuples.get('string')

const queryStringEncoded3 = urlObjectFromStringTuples.toString()
queryStringEncoded3
