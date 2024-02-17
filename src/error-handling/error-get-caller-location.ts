// inspiration: [Understanding JavaScript Error Stack Traces (Call Frames) for Capturing Decorator Error Locations | by Moxi | Medium](https://medium.com/@fwx5618177/understanding-javascript-error-stack-traces-call-frames-for-capturing-decorator-error-locations-6e8ea61e3c72)
export function getCallerLocation() {
  const error = new Error()
  Error.captureStackTrace(error, getCallerLocation)

  const stackLines = error.stack?.split('\n')

  if (!stackLines) {
    return 'Unknown Location'
  }

  // Assuming the call location is on the third line of the stack
  if (stackLines.length >= 4) {
    return stackLines[2]?.trim()
  }

  return stackLines[0]?.trim()
}
