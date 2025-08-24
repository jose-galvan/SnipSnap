import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

export const CurrentUserId = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context)
  const user = ctx.getContext().req.user
  return user?.sub
})
