/**
 * @see {@link [A better way to use 3rd-part types (Extract & Exclude) - YouTube](https://www.youtube.com/watch?v=L8LSY27kp0I&t=115s&ab_channel=AndrewBurgess)}
 * @param array
 * @param type
 */
function filterByType<T extends { type: string }, U extends T['type']>(
  array: T[],
  type: U
) {
  type R = Extract<T, { type: U }>
  return array.filter((item): item is R => item.type === type)
}

type StandardUser = { type: 'user'; id: number }
type AdminUser = { type: 'admin'; id: number }
type User = StandardUser | AdminUser

declare const users: User[]

const admins = filterByType(users, 'admin')
