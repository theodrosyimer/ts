type InferedAsTuple = [unknown, ...unknown[]]

const options = [
  { label: 'View', value: 'VIEW' },
  { label: 'Full Access', value: 'FULL_ACCESS' },
] satisfies InferedAsTuple

console.log(options[2])
