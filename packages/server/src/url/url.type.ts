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
      require_protocol: true,
      require_valid_protocol: true,
      protocols: ['http', 'https'],
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
export class UpdateSlugInput {
  @IsNotEmpty({ message: 'Id cannot be empty' })
  @Field(() => String, { nullable: false })
  id: string

  @IsNotEmpty({ message: 'Slug cannot be empty' })
  @Field(() => String, { nullable: false })
  slug: string
}