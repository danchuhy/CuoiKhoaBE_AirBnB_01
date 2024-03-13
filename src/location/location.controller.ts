import {
  Controller,
  Get,
  Post,
  Query,
  Res,
  Body,
  UseGuards,
  Param,
  Req,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { LocationService } from './location.service';

import { CreateLocationDto } from './dto/createLocation.dto';
import { UpdateLocationDto } from './dto/updateLocation.dto';


@ApiTags('ViTri')
@Controller('api')
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
  ) {}

  @Get('/vi-tri')
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'size', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  async getListLocation(
    @Query('page') page,
    @Query('size') size,
    @Query('keyword') keyword,
    @Res() response,
  ): Promise<any> {
    const data = await this.locationService.getListLocation(
      page,
      size,
      keyword,
    );
    response.status(data.status).json(data);
  }

  @Get('/vi-tri/:id')
  @ApiParam({ name: 'id', required: true, type: Number })
  async getLocationById(@Param('id') id, @Res() response): Promise<any> {
    const data = await this.locationService.getLocationById(id);
    response.status(data.status).json(data);
  }

  @Post('/vi-tri')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateLocationDto })
  async createLocation(
    @Body() body: CreateLocationDto,
    @Res() response,
  ): Promise<any> {
    const data = await this.locationService.createLocation(body);
    response.status(data.status).json(data);
  }

  @Put('/vi-tri/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: UpdateLocationDto })
  @ApiParam({ name: 'id', required: true, type: Number })
  async updateLocation(
    @Param('id') id,
    @Body() body: UpdateLocationDto,
    @Res() response,
    @Req() request,
  ): Promise<any> {
    const token = request.headers.authorization.split(' ')[1];
    const data = await this.locationService.updateLocation(id, body, token);
    response.status(data.status).json(data);
  }

  @Delete('/vi-tri/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', required: true, type: Number })
  async deleteLocationById(
    @Param('id') id,
    @Res() response,
    @Req() request,
  ): Promise<any> {
    const token = request.headers.authorization.split(' ')[1];
    const data = await this.locationService.deleteLocationById(id, token);
    response.status(data.status).json(data);
  }


}
