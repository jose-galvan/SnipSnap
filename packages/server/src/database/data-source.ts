import { DataSource } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'

const configService = new ConfigService()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get<string>('DB_USERNAME', 'user'),
  password: configService.get<string>('DB_PASSWORD', 'password'),
  database: configService.get<string>('DB_NAME', 'dev'),
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './migrations/*{.ts,.js}')],
  synchronize: false, // Always false for migrations
  logging: configService.get<boolean>('DB_LOGGING', false),
})
