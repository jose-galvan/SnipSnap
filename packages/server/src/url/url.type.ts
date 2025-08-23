import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql'
import { IsUrl, IsNotEmpty } from 'class-validator'

@ObjectType()
export class UrlType {
  @Field()
  id: string

  @Field({ nullable: true })
  slug: string

  @Field({ nullable: false })
  @IsUrl(
    {
      //Note: we can add validation options such as protocol, etc...
    },
    { message: 'Please provide a valid URL' }
  )
  @IsNotEmpty({ message: 'URL cannot be empty' })
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
  @IsUrl({}, { message: 'Please provide a valid URL' })
  @IsNotEmpty({ message: 'URL cannot be empty' })
  url: string
}

@InputType()
export class UpdateSlugInput extends PickType(UrlType, ['id', 'originalUrl'] as const) {}
