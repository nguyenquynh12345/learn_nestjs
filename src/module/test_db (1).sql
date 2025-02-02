-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: mysql-container:3306
-- Thời gian đã tạo: Th2 02, 2025 lúc 05:33 PM
-- Phiên bản máy phục vụ: 8.0.40
-- Phiên bản PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `test_db`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category_rooms`
--

CREATE TABLE `category_rooms` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `category_rooms`
--

INSERT INTO `category_rooms` (`id`, `name`, `description`, `created_at`) VALUES
(1, 'Deluxe Room1', 'A spacious and luxurious room with a beautiful view.', '2025-01-07 03:35:48'),
(2, 'Deluxe Room2', 'A spacious and luxurious room with a beautiful view.', '2025-01-07 03:35:48');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int NOT NULL,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rooms`
--

CREATE TABLE `rooms` (
  `id` int NOT NULL,
  `roomName` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text,
  `capacity` int DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `status` enum('available','unavailable') DEFAULT 'available',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `roomType` enum('single','double','suite') DEFAULT 'single',
  `imageUrl` varchar(255) DEFAULT NULL,
  `userId` varchar(255) NOT NULL,
  `address` varchar(1000) NOT NULL,
  `electricityPrice` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `waterPrice` varchar(40) NOT NULL,
  `utilities` varchar(255) NOT NULL,
  `region` int NOT NULL,
  `categories` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `rooms`
--

INSERT INTO `rooms` (`id`, `roomName`, `description`, `capacity`, `price`, `status`, `created_at`, `roomType`, `imageUrl`, `userId`, `address`, `electricityPrice`, `waterPrice`, `utilities`, `region`, `categories`) VALUES
(18, 'PHÒNG BANCOL FULL NỘI THẤT GIÁ CỰC RẺ TẠI 327 TRẦN HƯNG ĐẠO', 'PHÒNG BANCOL FULL NỘI THẤT GIÁ CỰC RẺ TẠI 327 TRẦN HƯNG ĐẠO \n\n- Thoáng mát, an ninh\n\n- Diện tích 30m2 rộng rãi\n\n- Ban công rộng, đầy đủ nội thất\n\n- Gần các trường ĐH, thuận tiện qua các quận trung tâm\n\nGiá 5tr5\n\nCÓ FIX MẠNH TAY CHO KHÁCH THIỆN CHÍ', 50, 1200000, 'available', '2025-02-02 15:36:49', 'single', '/uploads/1738510609474-de5t1j.jpg', '11', '327 Trần Hưng Đạo, Phường Cô Giang, Quận 1, Hồ Chí Minh ', '120000', '21000', 'Đầy đủ nội thất', 1, 'otp4');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `userName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `userName`, `email`, `password`, `phone`, `created_at`) VALUES
(11, 'quynh12345z', 'test@gmail.com', '$2b$10$URtggCqpsjMyicZ.AJs/7ef5XO87FJMho/nJUHen/3DfOlKWg3a8O', '0868704562', '2025-01-18 03:23:57');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_client`
--

CREATE TABLE `user_client` (
  `id` bigint UNSIGNED NOT NULL,
  `userName` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `category_rooms`
--
ALTER TABLE `category_rooms`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `user_client`
--
ALTER TABLE `user_client`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `category_rooms`
--
ALTER TABLE `category_rooms`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `user_client`
--
ALTER TABLE `user_client`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
