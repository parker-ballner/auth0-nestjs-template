import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Public } from 'src/middleware/auth/public'
import { CreateUserDto, UpdateUserDto, UserDto } from './dto'
import { UserService } from './services'
import { Token } from 'src/controller'

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async Get(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<UserDto> {
    return new UserDto(await this.userService.get(id))
  }

  @Public()
  @UseGuards(AuthGuard('jwt-no-auth'))
  @Post()
  async Create(
    @Req() req: { user: Token },
    @Body() dto: CreateUserDto,
  ): Promise<UserDto> {
    return new UserDto(await this.userService.create(dto, req.user))
  }

  @Put('/:id')
  async Update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserDto> {
    return new UserDto(await this.userService.update(dto, id))
  }
}
