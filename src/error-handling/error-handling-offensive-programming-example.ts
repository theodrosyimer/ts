/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/**
 *### Downsides of offensive programming
 *
 *  - having to avoid certain kinds of code like default arguments, default cases, etc.
 *  - having to crash the program (but this downside can be prevented if you turn assertions off in production)
 *  - performance is worse (but this downside can be prevented if you turn assertions off in production)
 */

/**
 * ### Error handling - Offensive programming example 1
 * @description Example of code which crashes the program if `array` is `null`, `undefined` or empty
 *
 * @link based on Programming Duck's youtube video "Defensive and offensive programming"
 */
function foo(array: unknown[]) {
  // code crashes if `array` is `null`, `undefined` or empty
  return array[0]
}

/**
 * ### Error handling - Defensive programming example 1
 * @description Example of defensive programming which does NOT crash the program if `array` is `null`, `undefined` or empty and can even try to recover from the error
 * @param array
 */
function fooDefensive(array: unknown[]) {
  // code does not crash if `array` is `null` or `undefined` or empty
  if (array != null) {
    return array[0]
  }
  // additionaly, do something to recover from the error
}

// //////////////////////////////////////////////////////////////////

/**
 * ### Error handling - Offensive programming example 2
 * @description Example of default case which isn't supposed to run
 * @link based on Programming Duck's youtube video "Defensive and offensive programming"
 */
function foo2(arg: string) {
  // code crashes if `array` is `null`, `undefined` or empty
  switch (arg) {
    case 'foo':
      // do something
      break
    case 'bar':
      // do something
      break
    default:
      // this code should never execute, so crash the program if it does
      throw new Error('Invalid argument')
  }
}

// ////////////////////////////////////////////////////////////////

/**
 * ### Error handling - Defensive programming example 3
 * @description Example of wrong state which isn't supposed to run
 * @link based on Programming Duck's youtube video "Defensive and offensive programming"
 */
function getCurrentPlayerHealth() {
  // @ts-expect-error - this is just an example
  const { health } = player
  if (health < 0 || health > 100) {
    throw new Error(
      'Invalid player health: player health must be between 0 and 100',
    )
  }
  // continue normal function execution
}
