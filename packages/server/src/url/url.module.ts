import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Url } from '../entities/url.entity'
import { UrlService } from './url.service'
import { UrlResolver } from './url.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  providers: [UrlService, UrlResolver],
  exports: [UrlService],
})
export class UrlModule {}
