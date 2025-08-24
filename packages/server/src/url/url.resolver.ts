import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UrlService } from './url.service'
import { UrlType, CreateSlugInput, UpdateSlugInput } from './url.type'
import { CurrentUserId, Public } from 'src/auth/auth.decorator'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/auth/auth.guard'

@UseGuards(GqlAuthGuard)
@Resolver(() => UrlType)
export class UrlResolver {
  constructor(private readonly service: UrlService) {}

  @Query(() => [UrlType])
  async mostRecent(): Promise<UrlType[]> {
    return this.service.findRecentUrls(10)
  }

  @Public()
  @Mutation(() => UrlType)
  async createUrl(
    @CurrentUserId() userId: string,
    @Args({ name: 'input', type: () => CreateSlugInput }) input: CreateSlugInput
  ): Promise<UrlType> {
    console.log('user', userId)
    return this.service.createWithGeneratedSlug(input.url)
  }

  @Public()
  @Mutation(() => UrlType)
  async updateSlug(
    @CurrentUserId() userId: string,
    @Args({ name: 'input', type: () => UpdateSlugInput }) input: UpdateSlugInput
  ): Promise<UrlType | null> {
    return this.service.updateSlug(input.id, input.slug)
  }
}
