import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
export class UpdateCommentDto {
  @ApiProperty()
  noi_dung: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  ngay_binh_luan: Date;

  @ApiProperty()
  sao_binh_luan: number;

  @ApiProperty()
  ma_nguoi_binh_luan: number;

  @ApiProperty()
  ma_phong: number;
}
