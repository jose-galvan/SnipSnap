import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Url } from '../entities/url.entity'
import { UrlService } from './url.service'

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  providers: [UrlService],
  exports: [UrlService],
})
export class UrlModule {}
