type InferedAsTuple = [unknown, ...unknown[]]

const options = [
  { label: 'View', value: 'VIEW' },
  { label: 'Full Access', value: 'FULL_ACCESS' },
] satisfies InferedAsTuple

// @ts-expect-error - wrong type
console.log(options[2])
