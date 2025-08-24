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
import { ThrottlerModule } from '@nestjs/throttler'
import { Env } from './app.constants'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    // ***** Middleware and App Modules ******
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ['config/.env', 'config/.env.local'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => getDatabaseConfig(configService),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      path: '/api/graphql',
      context: ({ req, res }) => ({ req, res }),
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        // max request per second
        {
          name: 'short',
          ttl: 1000,
          limit: configService.get(Env.SHORT_THROTTLE) || 3,
        },
        // requests limit within 10 seconds
        {
          name: 'medium',
          ttl: 10000,
          limit: configService.get(Env.MEDIUM_THROTTLE) || 10,
        },
        // requests limit per hour
        {
          name: 'long',
          ttl: 3600 * 1000,
          limit: configService.get(Env.LONG_THROTTLE) || 100,
        },
      ],
    }),
    // ***** My modules ******
    UrlModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
