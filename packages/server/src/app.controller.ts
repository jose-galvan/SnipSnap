import { Controller, Get, Res, Param, HttpCode } from '@nestjs/common'
import { type Response } from 'express'
import { UrlService } from './url/url.service'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { ConfigService } from '@nestjs/config'
import { Env, Events } from './app.constants'

@Controller()
export class AppController {
  constructor(
    private readonly urlService: UrlService,
    private readonly eventEmitter: EventEmitter2,
    private readonly configService: ConfigService
  ) {}

  @HttpCode(200)
  @Get()
  ok() {
    return 'Ok'
  }

  @Get(':slug')
  async redirect(@Param('slug') slug: string, @Res() response: Response) {
    const url = await this.urlService.findBySlug(slug)
    if (!url) {
      return response.redirect(this.configService.get(Env.DEFAULT_REDIRECT)!)
    }

    this.eventEmitter.emit(Events.URL_CLICKED, url)
    return response.redirect(url.originalUrl)
  }
}
