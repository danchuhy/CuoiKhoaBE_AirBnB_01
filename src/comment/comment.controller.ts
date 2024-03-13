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

import { CommentService } from './comment.service';

import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';


@ApiTags('BinhLuan')
@Controller('api')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/binh-luan')
  async getListComments(@Res() response): Promise<any> {
    const data = await this.commentService.getListComments();
    response.status(data.status).json(data);
  }

  @Get('/binh-luan/:maPhong')
  @ApiParam({ name: 'maPhong', required: true, type: Number })
  async getCommentByIdRoom(@Param('maPhong') maPhong, @Res() response): Promise<any> {
    const data = await this.commentService.getCommentByIdRoom(maPhong);
    response.status(data.status).json(data);
  }

  @Post('/binh-luan')
  @ApiBody({ type: CreateCommentDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async createComment(
    @Body() body: CreateCommentDto,
    @Res() response,
  ): Promise<any> {
    const data = await this.commentService.createComment(body);
    response.status(data.status).json(data);
  }

  @Put('/binh-luan/:id')
  @ApiBody({ type: CreateCommentDto })
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async updateComment(
    @Param('id') id,
    @Body() body: UpdateCommentDto,
    @Res() response,
  ): Promise<any> {
    const data = await this.commentService.updateComment(id, body);
    response.status(data.status).json(data);
  }

  @Delete('/binh-luan/:id')
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async deleteComment(
    @Param('id') id,
    @Res() response,
  ): Promise<any> {
    const data = await this.commentService.deleteComment(id);
    response.status(data.status).json(data);
  }


}
