import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class UpdateReserveARoomDto {
  @ApiProperty()
  ma_phong: number;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  ngay_den: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  ngay_di: Date;

  @ApiProperty()
  so_luong_khach: number;

  @ApiProperty()
  ma_nguoi_dat: number;
}
