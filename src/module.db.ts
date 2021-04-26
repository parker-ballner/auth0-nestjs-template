import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import User from './entities/user'

export const useFactory = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  name: 'demo',

  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: parseInt(process.env.POSTGRES_PORT),

  migrationsTableName: 'migration',

  entities: [User],
  migrations: ['dist/migrations/*.js'],

  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
  },

  connectTimeoutMS: 10000,
  migrationsRun: true,
  ssl: false,
})

@Module({
  imports: [TypeOrmModule.forRootAsync({ name: 'demo', useFactory })],
})
export class DbModule {}
