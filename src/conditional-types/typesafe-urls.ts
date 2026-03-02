// source: https://www.linkedin.com/posts/adrian-po%C5%82ubi%C5%84ski-281ab2172_lemme-leave-it-here-utility-type-for-making-activity-7351113940828860416-s574?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD_aqRABVXncVe6JaMWxOYb03qO2ymAO-8k

// Recursively joins path segments with a slash. Does not add a trailing slash.
type toPath<Items extends string[]> = Items extends [
  infer Head extends string,
  ...infer Tail extends string[],
]
  ? `${Head}${Tail extends [] ? '' : `/}${toPath<Tail>}`}`
  : ''

// Recursively builds a query string from parameters names
type toQueryString<Params extends string[]> = Params extends [
  infer Head extends string,
  ...infer Tail extends string[],
]
  ? `${Head}=${string}${Tail extends [] ? '' : '&'}${toQueryString<Tail>}`
  : ''

// Main utility type
type SafeUrl<
  Protocols extends 'https' | 'http',
  Domain extends `${string}.${'com' | 'dev' | 'net' | 'org' | 'io'}`,
  Path extends string[] = [],
  QueryParams extends string[] = [],
> = `${Protocols}://${Domain}${Path extends []
  ? ''
  : `/${toPath<Path>}`}${QueryParams extends []
  ? ''
  : `?${toQueryString<QueryParams>}`}`

type Url = SafeUrl<'https', 'example.com', ['path'], ['param1', 'param2']>

const url: Url = 'https://example.com/path?param1=value1&param2=value2'
