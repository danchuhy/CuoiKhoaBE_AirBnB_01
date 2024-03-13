import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { CreateReserveARoomDto } from './dto/createReserveARoom.dto';
import { UpdateReserveARoomDto } from './dto/updateReserveARoom.dto';

@Injectable()
export class ReserveARoomService {
  prisma = new PrismaClient();

  async getListReserveARooms(): Promise<any> {
    try {
      const data = await this.prisma.datPhong.findMany();
      return {
        status: 200,
        content: 'Success',
        message: 'Lấy danh sách đặt phòng thành công',
        data: data,
      };
    } catch (error) {
      return {
        status: 500,
        content: 'Internal server error',
        message: error,
      };
    }
  }

  async getReserveARoomById(id: string): Promise<any> {
    try {
      const data = await this.prisma.datPhong.findFirst({
        where: {
          id_dat_phong: +id,
        },
      });

      if (!data) {
        return {
          status: 404,
          content: 'Not found',
          message: 'Phòng đặt không tồn tại',
        };
      }

      return {
        status: 200,
        content: 'Success',
        message: `Lấy thông tin phòng success`,
        data: data,
      };
    } catch (error) {
      return {
        status: 500,
        content: 'Internal server error',
        message: error,
      };
    }
  }

  async getReserveARoomByIdUser(id: string): Promise<any> {
    try {
      const data = await this.prisma.datPhong.findMany({
        where: {
          ma_nguoi_dat: +id,
        },
      });

      if (!data) {
        return {
          status: 404,
          content: 'Not found',
          message: 'Tài khoản không có phòng đặt nào',
        };
      }

      return {
        status: 200,
        content: 'Success',
        message: `Lấy thông tin phòng thành công`,
        data: data,
      };
    } catch (error) {
      return {
        status: 500,
        content: 'Internal server error',
        message: error,
      };
    }
  }

  async reserveARoom(body: CreateReserveARoomDto): Promise<any> {
    try {
      const { ma_phong, ngay_den, ngay_di, so_luong_khach, ma_nguoi_dat } =
        body;

      const checkRoom = await this.prisma.phong.findFirst({
        where: {
          id_phong: ma_phong,
        },
      });

      if (!checkRoom) {
        return {
          status: 404,
          content: 'Not found',
          message: 'Phòng không tồn tại',
        };
      }

      const checkUser = await this.prisma.nguoiDung.findFirst({
        where: {
          id_nguoi_dung: ma_nguoi_dat,
        },
      });

      if (!checkUser) {
        return {
          status: 404,
          content: 'Not found',
          message: 'Tài khoản không tồn tại',
        };
      }

      const data = {
        ma_phong: ma_phong,
        ngay_den: new Date(ngay_den),
        ngay_di: new Date(ngay_di),
        so_luong_khach: so_luong_khach,
        ma_nguoi_dat: ma_nguoi_dat,
      };

      await this.prisma.datPhong.create({
        data: data,
      });

      return {
        status: 201,
        content: 'Success',
        message: 'Đặt phòng thành công',
      };
    } catch (error) {
      return {
        status: 500,
        content: 'Internal server error',
        message: error.message,
      };
    }
  }

  async updateReserveARoom(
    body: UpdateReserveARoomDto,
    id: string,
  ): Promise<any> {
    try {
      const { ma_phong, ngay_den, ngay_di, so_luong_khach, ma_nguoi_dat } =
        body;

      const [checkRoom, checkUser, checkIDDatPhong] = await Promise.all([
        this.prisma.phong.findFirst({ where: { id_phong: ma_phong } }),
        this.prisma.nguoiDung.findFirst({
          where: { id_nguoi_dung: ma_nguoi_dat },
        }),
        this.prisma.datPhong.findFirst({ where: { id_dat_phong: +id } }),
      ]);

      if (!checkRoom) {
        return {
          status: 404,
          content: 'Not found',
          message: 'không tìm thấy phòng',
        };
      }
      if (!checkUser) {
        return {
          status: 404,
          content: 'Not found',
          message: 'Tài khoản không tồn tại',
        };
      }
      if (!checkIDDatPhong) {
        return {
          status: 404,
          content: 'Not found',
          message: 'Phòng đặt không tồn tại',
        };
      }
      const updateData = {
        ma_phong,
        ngay_den: new Date(ngay_den),
        ngay_di: new Date(ngay_di),
        so_luong_khach,
        ma_nguoi_dat,
      };

      await this.prisma.datPhong.update({
        where: {
          id_dat_phong: +id,
        },
        data: updateData,
      });

      return {
        status: 200,
        content: 'Success',
        message: 'Cập nhật phòng đặt thành công',
      };
    } catch (error) {
      return {
        status: 500,
        content: 'Internal server error',
        message: error,
      };
    }
  }

  async deleteReserveARoom(id: string): Promise<any> {
    try {
      const data = await this.prisma.datPhong.findFirst({
        where: {
          id_dat_phong: +id,
        },
      });

      if (!data) {
        return {
          status: 404,
          content: 'Not found',
          message: 'Phòng đặt không tồn tại',
        };
      }

      await this.prisma.datPhong.delete({
        where: {
          id_dat_phong: +id,
        },
      });

      return {
        status: 200,
        content: 'Success',
        message: 'Xoá phòng đặt thành công',
      };
    } catch (error) {
      return {
        status: 500,
        content: 'Internal server error',
        message: error,
      };
    }
  }


}
