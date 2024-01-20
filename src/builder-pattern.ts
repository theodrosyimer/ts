/* eslint-disable no-use-before-define */
function createGenerator(name: string) {
  return {} as Generator
}

interface BasePromptOptions {
  message?: string
}

interface TextPrompOptions extends BasePromptOptions {
  type: 'text'
  default?: string
}

interface BooleanTextPrompOptions extends BasePromptOptions {
  type: 'boolean'
  default?: boolean
}

interface NumberTextPrompOptions extends BasePromptOptions {
  type: 'number'
  default?: number
}

interface Generator<
  TPromptOptions extends Record<string, string> = Record<
    string,
    never
  > /* = {} // not good to use empty object literal */,
> {
  prompt<TKey extends string>(
    key: TKey,
    options: TextPrompOptions,
  ): Generator<TPromptOptions & Record<TKey, string>>
  prompt<TKey extends string>(
    key: TKey,
    options: BooleanTextPrompOptions,
  ): Generator<TPromptOptions & Record<TKey, boolean>>
  prompt<TKey extends string>(
    key: TKey,
    options: NumberTextPrompOptions,
  ): Generator<TPromptOptions & Record<TKey, number>>
  ensureDir: (
    dir: string | ((opts: TPromptOptions) => string),
  ) => Generator<TPromptOptions>
  createFile: (
    filename: string | ((opts: TPromptOptions) => string),
  ) => Generator<TPromptOptions>
  cd: (
    dir: string | ((opts: TPromptOptions) => string),
  ) => Generator<TPromptOptions>
}

function createTemplate<TOpts>(func: (opts: TOpts) => string) {
  return func
}

const packageJsontemplate = createTemplate<{
  name: string
  description: string
}>((opts) =>
  JSON.stringify(
    {
      name: opts.name,
      description: opts.description,
      scripts: {},
      devDependencies: {},
      dependencies: {},
    },
    null,
    2,
  ),
)

const newPkg = createGenerator('new-pkg')
  .prompt('name', {
    type: 'text',
    message: 'What is the name of your package?',
  })
  .prompt('useEslint', {
    type: 'boolean',
    message: 'Do you x-want to use ESLINT?',
  })
  .prompt('PackageDir', {
    type: 'text',
    message: 'Where do you want to create your',
    default: 'packages',
  })
  .ensureDir((opts) => `./${opts.PackageDir}/${opts.name}`)
  .cd((opts) => `./${opts.PackageDir}/${opts.name}`)
  .createFile('package.json')
