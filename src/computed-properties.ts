/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
console.log('hello from computed-properties.ts')

const kContextIsGlobal = Symbol('ctx')
class DataStrucutre<T> {
  #data = new Map<any, T>()

  #isGlobal = false

  _tag = ''

  constructor() {}

  add(key: string, value: T) {
    this.#data.set(key, value)
  }

  delete(key: string) {
    this.#data.delete(key)
  }

  get(key: string) {
    return this.#data.get(key)
  }

  [kContextIsGlobal]() {
    return this.#isGlobal
  }

  get size() {
    return this.#data.size
  }

  log() {
    console.info(this.#data)
  }
}

type Struct = {
  dest: string
}
const struct = new DataStrucutre<Struct>()

struct.size // ?
struct.add('yoo1', { dest: './logs/dev/info' })
struct.add('yoo2', { dest: './logs/dev/error' })
struct.add('yoo3', { dest: './logs/dev/trace' })

struct.size // ?
struct.delete('yoo1')

struct.size // ?
struct.get('yoo2') // ?

struct.log()
struct // ?
