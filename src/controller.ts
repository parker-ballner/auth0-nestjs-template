import { Controller, Get } from '@nestjs/common'
import { Public } from './middleware/auth/public'

@Controller('/')
export class RootController {
  @Public()
  @Get('/health')
  HealthCheck(): { hello: 'world' } {
    return { hello: 'world' }
  }
}

export class Token {
  'https://email_verified/': string
  'https://email/': string
  sub: string
}
