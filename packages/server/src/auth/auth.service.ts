import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { ConfigService } from '@nestjs/config'
import { encryptWithSalt } from 'src/utils/encrypt'
import { Env } from 'src/app.constants'
import { JwtService } from '@nestjs/jwt'
import { AuthResponse, SignInInput, SignUpInput } from './auth.type'
import { User } from 'src/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async validate({ username, password: pass }: SignInInput | SignUpInput): Promise<Partial<User | null>> {
    const passwordEncripted = await encryptWithSalt(pass, this.configService.get(Env.PASSWORD_SALT)!)
    const user = await this.usersService.findOne(username)
    if (user?.password !== passwordEncripted) {
      return null
    }
    const { password, ...result } = user
    return result
  }

  async logIn(input: SignInInput | SignUpInput): Promise<AuthResponse> {
    const user = await this.validate(input)
    if (!user) {
      throw new UnauthorizedException()
    }
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
