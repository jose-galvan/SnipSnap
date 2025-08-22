import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql'

@ObjectType()
export class UrlType {
  @Field()
  id: string

  @Field({ nullable: true })
  slug: string

  @Field({ nullable: false })
  originalUrl: string

  @Field(() => Int)
  clickCount: number

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

@InputType()
export class CreateSlugInput {
  @Field()
  url: string
}

@InputType()
export class UpdateSlugInput extends PickType(UrlType, ['id', 'originalUrl'] as const) {}
