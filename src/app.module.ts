import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RoomsModule } from './rooms/rooms.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LocationModule } from './location/location.module';
import { CommentModule } from './comment/comment.module';
import { ReserveARoomModule } from './reserve_a_room/reserve_a_room.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: './public',
    }),
    RoomsModule,
    LocationModule,
    CommentModule,
    ReserveARoomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
