import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ThrottlerGuard } from '@nestjs/throttler'

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context)
    const ctx = gqlCtx.getContext()

    if (ctx.req) {
      return { req: ctx.req, res: ctx.req.res || {} }
    }

    const httpCtx = context.switchToHttp()
    return { req: httpCtx.getRequest(), res: httpCtx.getResponse() }
  }

  protected async getTracker(req: Record<string, any>): Promise<string> {
    return req.ip || req.socket?.remoteAddress || req.connection?.remoteAddress || 'unknown'
  }
}
