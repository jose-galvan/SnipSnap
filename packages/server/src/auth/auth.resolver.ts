import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { AuthService } from './auth.service'
import { AuthResponse, SignInInput, SignUpInput } from './auth.type'
import { UsersService } from 'src/users/users.service'

@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Mutation(() => AuthResponse)
  async signIn(@Args({ name: 'input', type: () => SignInInput }) input: SignInInput): Promise<AuthResponse> {
    return this.authService.logIn(input)
  }

  @Mutation(() => AuthResponse)
  async signUp(@Args({ name: 'input', type: () => SignUpInput }) input: SignUpInput): Promise<AuthResponse> {
    await this.usersService.create(input.username, input.password)
    return this.authService.logIn(input)
  }
}
