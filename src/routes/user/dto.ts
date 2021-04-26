import { IsEmail, IsNotEmpty } from 'class-validator'
import User from 'src/entities/user'

export class CreateUserDto {
  @IsNotEmpty()
  username: string
  @IsNotEmpty()
  first: string
  @IsNotEmpty()
  last: string
  @IsEmail()
  email: string
}

export class UpdateUserDto {
  @IsNotEmpty()
  username: string
  @IsNotEmpty()
  first: string
  @IsNotEmpty()
  last: string
}

export class UserDto {
  id?: string
  @IsNotEmpty()
  username: string
  @IsNotEmpty()
  first: string
  @IsNotEmpty()
  last: string
  @IsEmail()
  email: string

  constructor({ id, username, first, last, email }: User) {
    return {
      id,
      username,
      first,
      last,
      email,
    }
  }
}
