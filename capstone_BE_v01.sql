-- -------------------------------------------------------------
-- TablePlus 5.8.2(528)
--
-- https://tableplus.com/
--
-- Database: AirBnB_CuoiKhoaBE_01
-- Generation Time: 2024-03-12 01:15:47.3750
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `BinhLuan` (
  `id_binh_luan` int NOT NULL AUTO_INCREMENT,
  `noi_dung` varchar(250) DEFAULT NULL,
  `ngay_binh_luan` date DEFAULT NULL,
  `sao_binh_luan` int DEFAULT NULL,
  `ma_nguoi_binh_luan` int DEFAULT NULL,
  `ma_phong` int DEFAULT NULL,
  PRIMARY KEY (`id_binh_luan`),
  KEY `ma_nguoi_binh_luan` (`ma_nguoi_binh_luan`),
  KEY `ma_phong` (`ma_phong`),
  CONSTRAINT `BinhLuan_ibfk_1` FOREIGN KEY (`ma_nguoi_binh_luan`) REFERENCES `NguoiDung` (`id_nguoi_dung`) ON DELETE CASCADE,
  CONSTRAINT `BinhLuan_ibfk_2` FOREIGN KEY (`ma_phong`) REFERENCES `Phong` (`id_phong`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `DatPhong` (
  `id_dat_phong` int NOT NULL AUTO_INCREMENT,
  `ngay_den` date DEFAULT NULL,
  `ngay_di` date DEFAULT NULL,
  `so_luong_khach` int DEFAULT NULL,
  `ma_phong` int DEFAULT NULL,
  `ma_nguoi_dat` int DEFAULT NULL,
  PRIMARY KEY (`id_dat_phong`),
  KEY `ma_nguoi_dat` (`ma_nguoi_dat`),
  KEY `ma_phong` (`ma_phong`),
  CONSTRAINT `DatPhong_ibfk_1` FOREIGN KEY (`ma_nguoi_dat`) REFERENCES `NguoiDung` (`id_nguoi_dung`) ON DELETE CASCADE,
  CONSTRAINT `DatPhong_ibfk_2` FOREIGN KEY (`ma_phong`) REFERENCES `Phong` (`id_phong`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `NguoiDung` (
  `id_nguoi_dung` int NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `pass_word` varchar(250) DEFAULT NULL,
  `phone` varchar(250) DEFAULT NULL,
  `birth_day` date DEFAULT NULL,
  `gender` varchar(250) DEFAULT NULL,
  `role` varchar(250) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_nguoi_dung`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Phong` (
  `id_phong` int NOT NULL AUTO_INCREMENT,
  `ten_phong` varchar(250) DEFAULT NULL,
  `khach` int DEFAULT NULL,
  `phong_ngu` int DEFAULT NULL,
  `giuong` int DEFAULT NULL,
  `phong_tam` int DEFAULT NULL,
  `gia_tien` float DEFAULT NULL,
  `mo_ta` varchar(250) DEFAULT NULL,
  `may_giat` tinyint(1) DEFAULT NULL,
  `ban_ui` tinyint(1) DEFAULT NULL,
  `tivi` tinyint(1) DEFAULT NULL,
  `dieu_hoa` tinyint(1) DEFAULT NULL,
  `wifi` tinyint(1) DEFAULT NULL,
  `bep` tinyint(1) DEFAULT NULL,
  `do_xe` tinyint(1) DEFAULT NULL,
  `ho_boi` tinyint(1) DEFAULT NULL,
  `ma_vi_tri` int DEFAULT NULL,
  PRIMARY KEY (`id_phong`),
  KEY `ma_vi_tri` (`ma_vi_tri`),
  CONSTRAINT `Phong_ibfk_1` FOREIGN KEY (`ma_vi_tri`) REFERENCES `ViTri` (`id_vi_tri`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ViTri` (
  `id_vi_tri` int NOT NULL AUTO_INCREMENT,
  `ten_vi_tri` varchar(250) DEFAULT NULL,
  `tinh_thanh` varchar(250) DEFAULT NULL,
  `quoc_gia` varchar(250) DEFAULT NULL,
  `hinh_anh` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_vi_tri`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `BinhLuan` (`id_binh_luan`, `noi_dung`, `ngay_binh_luan`, `sao_binh_luan`, `ma_nguoi_binh_luan`, `ma_phong`) VALUES
(1, 'Phòng rất sạch sẽ và thoải mái.', '2024-03-17', 5, 2, 1),
(2, 'Dịch vụ tuyệt vời, nhân viên thân thiện.', '2024-04-12', 4, 3, 2),
(3, 'Giá cả hợp lý, phòng ổn định.', '2024-05-22', 4, 1, 3);

INSERT INTO `DatPhong` (`id_dat_phong`, `ngay_den`, `ngay_di`, `so_luong_khach`, `ma_phong`, `ma_nguoi_dat`) VALUES
(1, '2024-03-15', '2024-03-20', 2, 1, 1),
(2, '2024-04-10', '2024-04-15', 2, 2, 2),
(3, '2024-05-20', '2024-05-25', 3, 3, 3);

INSERT INTO `NguoiDung` (`id_nguoi_dung`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `avatar`) VALUES
(1, 'Nguyễn Văn A', 'nguyenvana@example.com', 'password123', '0987654321', '1990-01-15', 'Nam', 'Admin', 'avatar1.jpg'),
(2, 'Trần Thị B', 'tranthib@example.com', 'abc123', '0123456789', '1995-06-20', 'Nữ', 'User', 'avatar2.jpg'),
(3, 'Lê Quang C', 'lequangc@example.com', 'pass123', '0369841752', '1988-12-10', 'Nam', 'User', 'avatar3.jpg');

INSERT INTO `Phong` (`id_phong`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `gia_tien`, `mo_ta`, `may_giat`, `ban_ui`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ma_vi_tri`) VALUES
(1, 'Phòng Deluxe', 2, 1, 1, 1, 100, 'Phòng sang trọng với đầy đủ tiện nghi', 1, 1, 1, 1, 1, 1, 1, 0, 1),
(2, 'Phòng Suite', 2, 1, 1, 2, 150, 'Phòng lớn với phòng tắm riêng và view đẹp', 1, 1, 1, 1, 1, 1, 1, 1, 2),
(3, 'Phòng Standard', 2, 1, 1, 1, 80, 'Phòng tiện nghi phù hợp cho gia đình nhỏ', 1, 1, 1, 1, 1, 1, 1, 0, 3);

INSERT INTO `ViTri` (`id_vi_tri`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`) VALUES
(1, 'Khu nghỉ dưỡng biển', 'Nha Trang', 'Việt Nam', 'nhatrang.jpg'),
(2, 'Khu du lịch núi', 'Đà Lạt', 'Việt Nam', 'dalat.jpg'),
(3, 'Trung tâm thành phố', 'Hồ Chí Minh', 'Việt Nam', 'hochiminh.jpg');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;