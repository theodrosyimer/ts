/* eslint-disable no-empty-pattern */

const user = {
  id: 1,
  name: 'Theo',
  email: 'example@example.com',
  password: 'mysecret',
  role: 'admin',
}

type User = typeof user

const methods = {
  eq<T>(value1: T, value2: T) {
    return value1 === value2
  },
} as const

type Methods = typeof methods

type Callback = (methods: Methods) => void

/**
 * Implement drizzle's client API
 *
 * @example
 * ```ts
 * db.select().from(user)
 *
 * db
      .select()
      .from(user)
      .limit(limit)
      .offset((page - 1) * limit)
 *
 * db
      .select({ id: user.id, email: user.email, password: user.password })
      .from(user)
      .where(eq(user.email, email))
 *
 * db.insert(user).values(newUser)
 *
 * db.query.movie.findMany({})
 * db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, id),
      columns: {
        password: false,
      },
    })
 * ```
 */
function queryBuilder<const T extends Record<string, unknown>>() {
  return {
    select(cb: Callback) {
      cb(methods)
      return {
        where(/* user: T,  */ cb: Callback) {
          cb(methods)
          return this
        },
      }
    },
  }
}

function buildQueryBuilder<const T extends Record<string, unknown>>() {
  return queryBuilder<T>()
}

const myQueryBuilder = buildQueryBuilder<User>()

myQueryBuilder.select(({ eq }) => eq(user.id, 1)).where(() => ({}))
