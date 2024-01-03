import { pass, fail } from '../promises.js'

const result = await pass('test') /*?*/
const failed = await fail('failed') /*?*/
