/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { z } from 'zod'

declare function createHandler<T extends z.ZodType>(
  schema: T,
  handler: (
    req: Omit<NextApiRequest, keyof z.output<T>> & z.output<T>,
    res: NextApiResponse,
  ) => void | Promise<void>,
): NextApiHandler

const schema = z.object({
  body: z.object({ id: z.string() }),
})

export const handler = createHandler(schema, (req) => {
  // handle request here

  req.body.id
  //       ^?
})
