import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateRoomDto } from './dto/createRoom.dto';
import { verify } from 'jsonwebtoken';
import { UpdateRoomDto } from './dto/updateRoom.dto';

@Injectable()
export class RoomsService {
  prisma = new PrismaClient();
  async getListRooms(
    page: string | undefined,
    size: string | undefined,
    keyword: string,
  ): Promise<any> {
    try {
      let numPage: number | undefined = undefined;
      let numSize: number | undefined = undefined;

      if (page !== undefined) {
        numPage = Number(page);
        if (isNaN(numPage)) {
          throw new Error('Giá trị của page không hợp lệ');
        }
      }

      if (size !== undefined) {
        numSize = Number(size);
        if (isNaN(numSize)) {
          throw new Error('Giá trị của size không hợp lệ');
        }
      }

      keyword == null && (keyword = '');

      const offset =
        numPage !== undefined ? (numPage - 1) * numSize! : undefined;

      const data = await this.prisma.phong.findMany({
        skip: offset,
        take: numSize,
        where: {
          OR: [
            {
              ten_phong: {
                contains: keyword,
              },
            },
          ],
        },

      });

      return {
        status: 200,
        content: 'Success',
        message: 'Lấy danh sách phòng thành công',
        data: data,
      };
    } catch (error) {
      return {
        status: 500,
        content: 'Internal Server Error',
        message: error,
      };
    }
  }

  async getRoomByLocation(ma_vi_tri: string): Promise<any> {
    try {
      const data = await this.prisma.phong.findMany({
        where: {
          ma_vi_tri: +ma_vi_tri,
        },
      });

      if (data.length === 0) {
        return {
          status: 404,
          content: 'Not Found',
          message: 'Phòng không tồn tại',
        };
      }

      return {
        status: 200,
        content: 'Success',
        message: 'Lấy danh sách phòng thành công',
        data: data,
      };
    } catch (error) {
      return {
        status: 500,
        content: 'Internal Server Error',
        message: error,
      };
    }
  }

  async getRoomById(id: string): Promise<any> {
    try {
      const data = await this.prisma.phong.findUnique({
        where: {
          id_phong: +id,
        },
      });

      if (!data) {
        return {
          status: 404,
          content: 'Not Found',
          message: 'Không tìm thấy phòng',
        };
      }

      return {
        status: 200,
        content: 'Success',
        message: 'Lấy thông tin phòng thành công',
        data: data,
      };
    } catch (error) {
      return {
        status: 500,
        content: 'Internal Server Error',
        message: error,
      };
    }
  }

  async createRoom(body: CreateRoomDto): Promise<any> {
    try {
      const {
        ten_phong,
        khach,
        phong_ngu,
        giuong,
        phong_tam,
        gia_tien,
        mo_ta,
        may_giat,
        ban_ui,
        tivi,
        dieu_hoa,
        wifi,
        bep,
        do_xe,
        ho_boi,
        ma_vi_tri,
      } = body;

      const data = {
        ten_phong: ten_phong,
        khach: khach,
        phong_ngu: phong_ngu,
        giuong: giuong,
        phong_tam: phong_tam,
        gia_tien: gia_tien,
        mo_ta: mo_ta,
        may_giat: may_giat,
        ban_ui: ban_ui,
        tivi: tivi,
        dieu_hoa: dieu_hoa,
        wifi: wifi,
        bep: bep,
        do_xe: do_xe,
        ho_boi: ho_boi,
        ma_vi_tri: ma_vi_tri,
      };

      await this.prisma.phong.create({
        data: data,
      });

      return {
        status: 201,
        content: 'Created',
        message: 'Tạo phòng thành công',
      };
    } catch (error) {
      return {
        status: 500,
        content: 'Internal Server Error',
        message: error,
      };
    }
  }

  async updateRoom(
    token: string,
    id: string,
    body: UpdateRoomDto,
  ): Promise<any> {
    try {
      const tokenDecode = verify(token, process.env.SECRET_KEY) as {
        role: string;
      };

      if (tokenDecode.role.toLowerCase() !== 'admin') {
        return {
          status: 403,
          content: 'Forbidden',
          message: 'Bạn không có quyền này',
        };
      }

      const {
        ten_phong,
        khach,
        phong_ngu,
        giuong,
        phong_tam,
        gia_tien,
        mo_ta,
        may_giat,
        ban_ui,
        tivi,
        dieu_hoa,
        wifi,
        bep,
        do_xe,
        ho_boi,
        ma_vi_tri,
      } = body;

      const data = await this.prisma.phong.findFirst({
        where: {
          id_phong: +id,
        },
      });

      if (!data) {
        return {
          status: 404,
          content: 'Not Found',
          message: 'Phòng không tồn tại',
        };
      }

      const dataUpdate = {
        ten_phong,
        khach,
        phong_ngu,
        giuong,
        phong_tam,
        gia_tien,
        mo_ta,
        may_giat,
        ban_ui,
        tivi,
        dieu_hoa,
        wifi,
        bep,
        do_xe,
        ho_boi,
        ma_vi_tri,
      };

      await this.prisma.phong.update({
        where: {
          id_phong: +id,
        },
        data: dataUpdate,
      });

      return {
        status: 200,
        content: 'Success',
        message: 'Câo nhật phòng thành công',
      };
    } catch (error) {
      return {
        status: 500,
        content: 'Internal Server Error',
        message: error,
      };
    }
  }

  async deleteRoomById(token: string, id: string): Promise<any> {
    try {
      const tokenDecode = verify(token, process.env.SECRET_KEY) as {
        role: string;
      };

      if (tokenDecode.role.toLowerCase() !== 'admin') {
        return {
          status: 403,
          content: 'Forbidden',
          message: 'Bạn không có quyền này',
        };
      }

      const data = await this.prisma.phong.findFirst({
        where: {
          id_phong: +id,
        },
      });

      if (!data) {
        return {
          status: 404,
          content: 'Not Found',
          message: 'Không tìm thấy phòng',
        };
      }

      await this.prisma.phong.delete({
        where: {
          id_phong: +id,
        },
      });

      return {
        status: 200,
        content: 'Success',
        message: 'Xoá phòng thành công',
      };
    } catch (error) {
      return {
        status: 500,
        content: 'Internal Server Error',
        message: error,
      };
    }
  }

}
