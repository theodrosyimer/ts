export type IPayload = {
  [key: string]: any
}

export type INodeProperties = {
  displayName: string
  name: string
  type: 'string' | 'number' | 'boolean' | 'object' | 'array'
  required?: boolean
  description?: string
  options?: {
    displayOptions: {
      show: {
        label: string
        value: string
      }[]
    }
  }
}

export type ProcessResult =
  | {
      success: true
      data: any
    }
  | {
      success: false
      code: string
      error: Error
      message: string
    }

export type WebhookData = {
  id: string
  event: 'user.created' | 'payment.fulfilled' | 'post.liked'
  payload: IPayload
  timestamp: Date
}

export type WebhookConfig = {
  url: string
  secret: string
  events: WebhookData['event'][]
}

export abstract class WebhookHandlerBase {
  abstract getEvents(): WebhookData['event'][]
  abstract getConfigProps(): INodeProperties[]
  abstract process(webhook: WebhookData): Promise<ProcessResult>

  protected validateEvent(event: string): event is WebhookData['event'] {
    return this.getEvents().includes(event as WebhookData['event'])
  }
}

// Usage in app
export class WebhookManager {
  private handlers = new Map<string, WebhookHandlerBase>()

  constructor(handlers: WebhookHandlerBase[]) {
    handlers.forEach((handler) => {
      this.handlers.set(handler.getEvents().join(','), handler)
    })
  }

  register(platform: string, handler: WebhookHandlerBase) {
    this.handlers.set(platform, handler)

    console.log(
      `Registered webhook handler for ${platform} with events: ${handler.getEvents()}`,
    )
  }

  unregister(platform: string) {
    this.handlers.delete(platform)

    console.log(`Unregistered webhook handler for ${platform}`)
  }

  async process(webhook: WebhookData): Promise<ProcessResult> {
    const handler = this.handlers.get(webhook.event)
    if (!handler) {
      return {
        success: false,
        code: 'WEBHOOK_HANDLER_NOT_FOUND',
        error: new Error('Handler not found'),
        message: `Handler not found for ${webhook.event}`,
      }
    }
    return handler.process(webhook)
  }
}
