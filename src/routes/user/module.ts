import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './services'
import { UserController } from './controller'
import { UserRepository } from '../../entities/user'
import { DbModule } from 'src/module.db'

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([UserRepository], 'demo')],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
