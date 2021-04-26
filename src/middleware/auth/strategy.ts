import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import User from 'src/entities/user'
import { UserService } from 'src/routes/user/services'
import { passportJwtSecret } from 'jwks-rsa'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `${process.env.AUTH0_DOMAIN}`,
      algorithms: ['RS256'],
    })
  }

  async validate(payload: { sub: string }): Promise<User> {
    const user = await this.userService.getBySub(payload.sub)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}

@Injectable()
export class JwtNoAuthStrategy extends PassportStrategy(
  Strategy,
  'jwt-no-auth',
) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `${process.env.AUTH0_DOMAIN}`,
      algorithms: ['RS256'],
    })
  }

  validate(payload: unknown): unknown {
    return payload
  }
}
