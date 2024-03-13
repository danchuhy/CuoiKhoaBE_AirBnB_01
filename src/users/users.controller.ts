import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { UsersService } from './users.service';

import CreateUserDto from './dto/createUser.dto';
import UpdateUserDto from './dto/updateUser.dto';


@ApiTags('NguoiDung')
@Controller('api')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get('/users')
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'size', type: Number, required: false })
  @ApiQuery({ name: 'keyword', type: String, required: false })
  async getListUsers(
    @Query('page') page,
    @Query('size') size,
    @Query('keyword') keyword,
    @Res() response,
  ): Promise<any> {
    const data = await this.usersService.getListUsers(page, size, keyword);
    response.status(data.status).json(data);
  }

  @ApiParam({ name: 'id', type: Number })
  @Get('users/:id')
  async getUserById(@Param('id') id, @Res() response): Promise<any> {
    const data = await this.usersService.getUserById(id);
    response.status(data.status).json(data);
  }

  @Post('/users')
  async createUser(@Body() body: CreateUserDto, @Res() response): Promise<any> {
    const data = await this.usersService.createUser(body);
    response.status(data.status).json(data);
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateUserDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('users/:id')
  async updateUsers(
    @Param('id') id,
    @Body() body: UpdateUserDto,
    @Res() response,
  ): Promise<any> {
    const data = await this.usersService.updateUser(id, body);
    response.status(data.status).json(data);
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/users/:id')
  async deleteUser(
    @Param('id') id: Number,
    @Res() response,
    @Req() request,
  ): Promise<any> {
    const token = request.headers.authorization.split(' ')[1];
    const data = await this.usersService.deleteUser(token, +id);
    response.status(data.status).json(data);
  }

}
