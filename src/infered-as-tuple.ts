type InferedAsTuple = [unknown, ...unknown[]]

const options = [
  { label: 'View', value: 'VIEW' },
  { label: 'Full Access', value: 'FULL_ACCESS' },
] as const satisfies InferedAsTuple

// @ts-expect-error - using wrong index raise error
console.log(options[2])
