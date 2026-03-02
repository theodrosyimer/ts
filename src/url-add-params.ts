export function addQueryParams(
  url: string | URL,
  params: string[][] | Record<string, string> | string | URLSearchParams,
) {
  const parsedUrl = new URL(url)
  parsedUrl.search = new URLSearchParams(params).toString()

  return parsedUrl.toString()
}

// example usage
let baseUrl = new URL('https://api.example.com')
let params = {
  page: '1',
  limit: '10',
  sort: 'title',
  order: 'asc',
  search: 'movie',
}

let moviesUrl = new URL('/movies', baseUrl)
let result = addQueryParams(moviesUrl, params)
console.log(result)
