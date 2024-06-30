import express, { type RequestHandler } from 'express'
import { type z, type ZodError } from 'zod'
import { type ParsedQs } from 'qs'

const createApiHandler =
  <TQuery extends ParsedQs = any, TBody extends Record<string, any> = any>(
    config: {
      query?: z.Schema<TQuery>
      body?: z.Schema<TBody>
    },
    handler: RequestHandler<any, any, TBody, TQuery>,
  ): RequestHandler<any, any, TBody, TQuery> =>
  (req, res, next) => {
    const { query, body } = req
    if (config.query) {
      try {
        config.query.parseAsync(query)
      } catch (e) {
        return res.status(400).send((e as ZodError).message)
      }
    }
    if (config.body) {
      try {
        config.body.parseAsync(body)
      } catch (e) {
        return res.status(400).send((e as ZodError).message)
      }
    }
    return handler(req, res, next)
  }
