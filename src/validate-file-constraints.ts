export const supportedFileSize = {
  '1MB': 1 * 1024 * 1024,
  '2MB': 2 * 1024 * 1024,
  '3MB': 3 * 1024 * 1024,
  '4MB': 4 * 1024 * 1024,
  '5MB': 5 * 1024 * 1024,
  '10MB': 10 * 1024 * 1024,
}

export type FileInformationType = keyof typeof FILE_USAGE_CONSTRAINTS

export const FILE_USAGE_CONSTRAINTS = {
  user: {
    file: {
      size: {
        max: supportedFileSize['10MB'],
      },
      types: [
        'file/pdf',
        'file/doc',
        'file/docx',
        'text/plain',
        'text/markdown',
        'text/csv',
        'text/xml',
      ],
    },
    image: {
      size: {
        max: supportedFileSize['5MB'],
      },
      types: ['image/jpeg', 'image/png', 'image/webp'],
    },
    another: {
      size: {
        max: supportedFileSize['1MB'],
      },
      types: [
        'file/pdf',
        'file/doc',
        'file/docx',
        'text/plain',
        'text/markdown',
        'text/csv',
        'text/xml',
      ],
    },
  },
  space: {
    image: {
      size: {
        max: supportedFileSize['2MB'],
      },
      types: ['image/jpeg', 'image/png', 'image/webp'],
    },
  },
} as const /*  satisfies Record<FileInformationType, {
  size: { max: number },
  types: string[]
  }> */

export type FileUsageConstraints = typeof FILE_USAGE_CONSTRAINTS

export function validateFileUpload<
  T extends FileUsageConstraints,
  TSubject extends keyof T,
  TType extends keyof T[TSubject],
>(file: File, subject: TSubject, type: TType, fileUsageConstraints: T) {
  const constraints = fileUsageConstraints[subject][type] as {
    size: { max: number }
    types: string[]
  }
  return (
    constraints.types.includes(file.type) && constraints.size.max >= file.size
  )
}

const file = new File([''], 'test.png', { type: 'image/png' })

validateFileUpload(file, 'user', 'another', FILE_USAGE_CONSTRAINTS)
