import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@ObjectType()
export class AuthResponse {
  @Field(() => String, { nullable: false })
  access_token: string
}

@InputType()
export class SignInInput {
  @IsNotEmpty({ message: 'Username cannot be empty' })
  @Field(() => String, { nullable: false })
  username: string

  @IsNotEmpty({ message: 'Slug cannot be empty' })
  @Field(() => String, { nullable: false })
  password: string
}

@InputType()
export class SignUpInput extends PickType(SignInInput, ['password', 'username'], InputType) {}
