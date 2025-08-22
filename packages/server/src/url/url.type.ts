import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'

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

@InputType('createSlugInput')
export class CreateSlugInput {
  @Field({ nullable: true })
  slug: string

  @Field({ nullable: false })
  originalUrl: string
}