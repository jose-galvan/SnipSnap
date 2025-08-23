import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Url } from '../entities/url.entity'
import { UrlService } from './url.service'
import { UrlResolver } from './url.resolver'
import { APP_GUARD } from '@nestjs/core'
import { GqlThrottlerGuard } from 'src/utils/throttler'

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  providers: [
    UrlService,
    UrlResolver,
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
  exports: [UrlService],
})
export class UrlModule {}
