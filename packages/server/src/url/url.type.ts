import { Field, InputType, Int, ObjectType, OmitType } from '@nestjs/graphql'

@ObjectType()
export class UrlType {
  @Field()
  id: string

  @Field()
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
export class CreateSlugInput extends OmitType(UrlType, ['id', 'clickCount', 'createdAt', 'updatedAt'] as const) {}

@InputType()
export class UpdateSlugInput extends OmitType(UrlType, [
  'originalUrl',
  'clickCount',
  'createdAt',
  'updatedAt',
] as const) {}
