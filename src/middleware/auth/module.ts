import { Module } from '@nestjs/common'
import { UserModule } from 'src/routes/user/module'
import { JwtNoAuthStrategy, JwtStrategy } from './strategy'
import { PassportModule } from '@nestjs/passport'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './guard'

@Module({
  imports: [UserModule, PassportModule],
  providers: [
    JwtStrategy,
    JwtNoAuthStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AuthModule {}
