import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

import { ReserveARoomService } from './reserve_a_room.service';

import { CreateReserveARoomDto } from './dto/createReserveARoom.dto';
import { UpdateReserveARoomDto } from './dto/updateReserveARoom.dto';


@ApiTags('DatPhong')
@Controller('api')
export class ReserveARoomController {
  constructor(private readonly reserveARoomService: ReserveARoomService) {}

  @Get('/reserve-a-rooms')
  async getListReserveARooms(@Res() response): Promise<any> {
    const data = await this.reserveARoomService.getListReserveARooms();
    response.status(data.status).json(data);
  }

  @Get('/reserve-a-room/:id')
  @ApiParam({ name: 'id', type: Number })
  async getReserveARoomById(@Res() response, @Param('id') id): Promise<any> {
    const data = await this.reserveARoomService.getReserveARoomById(id);
    response.status(data.status).json(data);
  }

  @Get('/reserve-a-room/user/:id')
  @ApiParam({ name: 'id', type: Number })
  async getReserveARoomByIdUser(
    @Res() response,
    @Param('id') id,
  ): Promise<any> {
    const data = await this.reserveARoomService.getReserveARoomByIdUser(id);
    response.status(data.status).json(data);
  }

  @Post('/reserve-a-room')
  @ApiBody({ type: CreateReserveARoomDto })
  async reserveARoom(
    @Body() body: CreateReserveARoomDto,
    @Res() response,
  ): Promise<any> {
    const data = await this.reserveARoomService.reserveARoom(body);
    response.status(data.status).json(data);
  }

  @Put('/reserve-a-room/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateReserveARoomDto })
  async updateReserveARoom(
    @Body() body: UpdateReserveARoomDto,
    @Param('id') id,
    @Res() response,
  ): Promise<any> {
    const data = await this.reserveARoomService.updateReserveARoom(body, id);
    response.status(data.status).json(data);
  }

  @Delete('/reserve-a-room/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: Number })
  async deleteReserveARoom(@Res() response, @Param('id') id): Promise<any> {
    const data = await this.reserveARoomService.deleteReserveARoom(id);
    response.status(data.status).json(data);
  }

}
