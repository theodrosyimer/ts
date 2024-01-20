/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-expect-error expect a `string`
import type express from 'express'

// an example of a class that implements the abstract class
export abstract class CoreRoutesConfig {
  app: express.Application

  name: string

  constructor(app: express.Application, name: string) {
    this.app = app
    this.name = name
    this.configureRoutes()
  }

  getName(): string {
    return this.name
  }

  abstract configureRoutes(): express.Application
}

// in `another-file.js`, we can extend the abstract class:
export class AuthRoutes extends CoreRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'AuthRoutes')
  }

  configureRoutes(): express.Application {
    this.app.post('/auth', [
      // do something...
    ])
    this.app.post('/auth/refresh-token', {
      // do something...
    })
    return this.app
  }
}
