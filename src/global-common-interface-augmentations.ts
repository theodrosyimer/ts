/**
 * Can be placed in any file or in a `global.d.ts` file  without the need to `declare global` or `declare module`.
 */

// In vite.js
declare global {
  interface ImportMetaEnv {
    MY_ENV: string
  }
}

// In tsconfig.json
// {
//   "compilerOptions": {
//     "types": ["vite/client"]
//   }
// }

// In your code
import.meta.env.MY_ENV // string

// In a `.d.ts` file
interface ImportMetaEnv {
  MY_ENV: string
}

// ///////////////////////////////////////////

// In NodeJS
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MY_ENV: string
    }
  }
}

// In tsconfig.json
// {
//   "compilerOptions": {
//     "types": ["node"]
//   }
// }

// In your code
process.env.MY_ENV // string

// In a `.d.ts` file
declare namespace NodeJS {
  interface ProcessEnv {
    MY_ENV: string
  }
}

// ///////////////////////////////////////////

// In the browser
declare global {
  interface Window {
    MY_ENV: string
  }
}

// In your code
window.MY_ENV // string

// In a `.d.ts` file
interface Window {
  MY_ENV: string
}
