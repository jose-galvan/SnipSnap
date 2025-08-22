import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UrlService } from './url.service'
import { UrlType, CreateSlugInput } from './url.type'

@Resolver(() => UrlType)
export class UrlResolver {
  constructor(private readonly service: UrlService) {}

  @Query(() => [UrlType])
  async mostRecent(): Promise<UrlType[]> {
    return this.service.findRecentUrls(10)
  }

  @Mutation(() => UrlType)
  async createUrl(@Args({ name: 'input', type: () => CreateSlugInput }) input: CreateSlugInput): Promise<UrlType> {
    return this.service.createWithGeneratedSlug(input.url)
  }
}
