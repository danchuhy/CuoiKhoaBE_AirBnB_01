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

import { RoomsService } from './rooms.service';

import { CreateRoomDto } from './dto/createRoom.dto';
import { UpdateRoomDto } from './dto/updateRoom.dto';


@ApiTags('Phong')
@Controller('api')
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
  ) {}

  @Get('/phong-thue')
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'size', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  async getListRooms(
    @Query('page') page,
    @Query('size') size,
    @Query('keyword') keyword,
    @Res() response,
  ): Promise<any> {
    const data = await this.roomsService.getListRooms(page, size, keyword);
    response.status(data.status).json(data);
  }

  @Get('/phong-thue/vi-tri/:ma_vi_tri')
  @ApiParam({ name: 'ma_vi_tri', required: true, type: Number })
  async getRoomByLocation(
    @Param('ma_vi_tri') ma_vi_tri,
    @Res() response,
  ): Promise<any> {
    const data = await this.roomsService.getRoomByLocation(ma_vi_tri);
    response.status(data.status).json(data);
  }

  @Get('/phong-thue/:id')
  @ApiParam({ name: 'id', required: true, type: Number })
  async getRoomById(@Param('id') id, @Res() response): Promise<any> {
    const data = await this.roomsService.getRoomById(id);
    response.status(data.status).json(data);
  }

  @Post('phong-thue')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateRoomDto })
  async createRoom(@Body() body: CreateRoomDto, @Res() response): Promise<any> {
    const data = await this.roomsService.createRoom(body);
    response.status(data.status).json(data);
  }

  @Put('/phong-thue/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', required: true, type: Number })
  async updateRoom(
    @Param('id') id,
    @Body() body: UpdateRoomDto,
    @Res() response,
    @Req() request,
  ): Promise<any> {
    const token = request.headers.authorization.split(' ')[1];
    const data = await this.roomsService.updateRoom(token, id, body);
    response.status(data.status).json(data);
  }

  @Delete('/phong-thue/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', required: true, type: Number })
  async deleteRoomById(
    @Param('id') id,
    @Res() response,
    @Req() request,
  ): Promise<any> {
    const token = request.headers.authorization.split(' ')[1];
    const data = await this.roomsService.deleteRoomById(token, id);
    response.status(data.status).json(data);
  }
}
