import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from 'src/entities/user.entity'
import { encryptWithSalt } from 'src/utils/encrypt'
import { ConfigService } from '@nestjs/config'
import { Env } from 'src/app.constants'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService
  ) {}

  async create(username: string, password: string): Promise<User> {
    const passwordEncripted = await encryptWithSalt(password, this.configService.get(Env.PASSWORD_SALT)!)
    const user = this.userRepository.create({
      username,
      password: passwordEncripted,
    })
    return this.userRepository.save(user)
  }

  async findOne(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    })
  }
}
