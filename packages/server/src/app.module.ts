import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getDatabaseConfig } from './database/database.config'
import { UrlModule } from './url/url.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { EventEmitterModule } from '@nestjs/event-emitter'

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ['config/.env', 'config/.env.local'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => getDatabaseConfig(configService),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      path: '/api/graphql',
    }),
    UrlModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
