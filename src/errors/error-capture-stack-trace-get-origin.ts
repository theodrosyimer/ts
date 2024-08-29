/* eslint-disable max-classes-per-file */

import { getCallerLocation } from './error-get-caller-location.ts'

// stack trace API: [Stack trace API · V8](https://v8.dev/docs/stack-trace-api)

// source: [node.js - Understanding Error.captureStackTrace and stack trace persistance? - Stack Overflow](https://stackoverflow.com/questions/59625425/understanding-error-capturestacktrace-and-stack-trace-persistance)

function fun1() {
  fun2()
}
function fun2() {
  fun3()
}
function fun3() {
  logStack()
}
function logStack() {
  const err = new Error()
  Error.captureStackTrace(err)
  console.error('ERROR_STACK:')
  console.error(err.stack)
  console.error()
  console.error('ERROR_LOCATION:')
  console.error(getCallerLocation())
}

// console.log(`\n${'-'.repeat(80)}\n`)
// console.log('Example 2:\n')

fun1()
