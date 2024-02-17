// source:
export function toBinary2(n: number): number {
  return parseInt(n.toString(2))
}

// my version of toBinary function
export function toBinary(n: number): number {
  // get the weights range in which i'm working for a given number, for example if n = 11:

  // 0) get the nearest biggest weight of `n` that < n
  // 1) `n` < 16 so it can only be calculated within this weights range 1/2/4/8, create a binaryMap representing the weights range
  // 2) it always use the `maxWeight` of that "range" -> 8
  // 3) iterate in reverse, so starting by 2nd biggest weight -> 4, add it to `maxWeight``
  // 4) check if `result` of the addition of those 2 nnumebrs is < or > of `n`
  // 5) if `result` > `n`, set the value of the current weight to 0, continue with next weight
  // 6) if `result` < `n`, set the value of the current weight to 1, continue with next weight

  // iterate the weights range until getting final result

  function getNearestWeight(n: number) {
    let weightLimit = 0
    let nthPowerLimit = 0

    while (weightLimit <= n) {
      nthPowerLimit++
      weightLimit = 2 ** nthPowerLimit
    }

    const nthPower = nthPowerLimit - 1
    const maxWeight = 2 ** nthPower

    return {
      maxWeight,
      nthPower,
    }
  }

  function createBinaryMap({ nthPower }: { nthPower: number }) {
    const binaryMap = new Map<number, number>()

    for (let index = nthPower; index > 0; index--) {
      binaryMap.set(2 ** index, 0)
    }
    binaryMap.set(1, 0)

    return binaryMap
  }

  function createBinaryMapFromPositiveInteger(n: number) {
    const { nthPower } = getNearestWeight(n)
    const binaryMap = createBinaryMap({ nthPower })
    let sum = 0

    for (const weight of binaryMap.keys()) {
      const currentResult = sum + weight

      if (currentResult <= n) {
        binaryMap.set(weight, 1)
      } else {
        binaryMap.set(weight, 0)
      }
      sum = currentResult <= n ? currentResult : sum
    }

    return binaryMap
  }

  function convertBinaryMapToNumber(n: number) {
    let result = ''
    for (const value of createBinaryMapFromPositiveInteger(n).values()) {
      result = `${result}${value}`
    }

    return +result
  }

  return convertBinaryMapToNumber(n)
}

toBinary(6) /*?. $*/
toBinary2(6) /*?. $*/
