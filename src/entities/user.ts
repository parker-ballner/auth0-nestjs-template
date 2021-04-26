import {
  Column,
  Entity,
  EntityRepository,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseEntity, BaseRepository } from '.'

@Entity({ name: 'users' })
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text', { unique: true })
  sub: string

  @Column('text', { unique: true })
  username: string

  @Column('text')
  first: string

  @Column('text')
  last: string

  @Column('text', { unique: true })
  email: string
}

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {
  async findBySub(sub: string): Promise<User> {
    return this.repository.findOne({ sub })
  }
}
