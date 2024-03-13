import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';

export default class UpdateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsEmail({})
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  pass_word: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  birth_day: Date;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  role: string;

  avatar: string;
}
