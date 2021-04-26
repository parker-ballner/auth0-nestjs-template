import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { RootController } from 'src/controller'
import { UserModule } from './routes/user/module'
import { AuthModule } from './middleware/auth/module'
import { AppLoggerMiddleware } from './middleware/logging'

@Module({
  controllers: [RootController],
  imports: [UserModule, AuthModule],
})
export class RootModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AppLoggerMiddleware)
      .exclude('health')
      .forRoutes('*')
  }
}
