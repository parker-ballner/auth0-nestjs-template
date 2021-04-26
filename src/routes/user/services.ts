import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Token } from 'src/controller'
import User, { UserRepository } from '../../entities/user'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, 'demo') private readonly repo: UserRepository,
  ) {}
  public async get(id: string): Promise<User> {
    return this.repo.findOneOrFail(id)
  }
  public async getBySub(sub: string): Promise<User> {
    return this.repo.findBySub(sub)
  }
  public async create(user: Partial<User>, token: Token): Promise<User> {
    const email = token['https://email/']
    // const emailVerified = token['https://email_verified/']

    if (!email || !token.sub) {
      // || !emailVerified
      throw new UnauthorizedException()
    } else if (user.email !== email) {
      throw new BadRequestException('invalid email')
    } else if (!!(await this.repo.findBySub(token.sub))) {
      throw new ConflictException('user already exists')
    }

    return this.repo.save({ ...user, sub: token.sub })
  }
  public async update(
    { username, first, last }: Partial<User>,
    id: string,
  ): Promise<User> {
    const current = await this.repo.findOneOrFail(id)
    return this.repo.save({ ...current, username, first, last })
  }
}
