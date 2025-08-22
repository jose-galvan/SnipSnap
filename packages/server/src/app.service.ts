import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppService {
  /**
   *
   */
  constructor(private config: ConfigService) {}
  getHello(): string {
    return `Hello World! from ${this.config.get('ENV')}`
  }
}
