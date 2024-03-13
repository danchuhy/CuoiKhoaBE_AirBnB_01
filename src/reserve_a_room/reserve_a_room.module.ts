import { Module } from '@nestjs/common';
import { ReserveARoomService } from './reserve_a_room.service';
import { ReserveARoomController } from './reserve_a_room.controller';

@Module({
  controllers: [ReserveARoomController],
  providers: [ReserveARoomService],
})
export class ReserveARoomModule {}
