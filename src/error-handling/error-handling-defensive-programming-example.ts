/**
 * @description This function takes a non-empty string and a natural integer as input
 * @link based on Programming Duck's youtube video "Defensive and offensive programming"
 * @param nonEmptyString
 * @param naturalIinteger
 */
function foo(nonEmptyString: string, naturalIinteger: number) {
  if (
    typeof nonEmptyString !== 'string' ||
    nonEmptyString === '' ||
    !Number.isInteger(naturalIinteger) ||
    naturalIinteger < 1
  ) {
    // * crash the program
    // process.exit(1)
    //
    // * or handle the error here
    // console.error(
    //   'An error occurred, you need to input a non-empty string and a natural integer',
    // )
    // return
    //
    // * or throw an exception so some code higher up handles the error
    // throw new Error('An error occurred, you need to input a non-empty string and a natural integer')
    //
    // * or do anything else your error recovery implementation requires
    // ...
  }
  // code for normal execution
  console.log('normal execution')
}

// foo('Theo', 1)
// foo('', 1)
