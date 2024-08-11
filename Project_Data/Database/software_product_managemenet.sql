-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 24, 2021 at 10:45 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `software_product_managemenet`
--

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE `bill` (
  `bill_id` int(11) NOT NULL,
  `bill_date` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bill`
--

INSERT INTO `bill` (`bill_id`, `bill_date`, `status`, `user_id`) VALUES
(1, '2012-04-23', 'paid', 772328112);

-- --------------------------------------------------------

--
-- Table structure for table `bill_items`
--

CREATE TABLE `bill_items` (
  `bill_item_id` int(11) NOT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `bill_id` int(11) NOT NULL,
  `barcode` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bill_items`
--

INSERT INTO `bill_items` (`bill_item_id`, `Quantity`, `bill_id`, `barcode`) VALUES
(10, 1, 1, '21235');

-- --------------------------------------------------------

--
-- Table structure for table `customer_queue`
--

CREATE TABLE `customer_queue` (
  `cart_id` int(11) NOT NULL,
  `state` varchar(15) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `barcode` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `login_logout_times`
--

CREATE TABLE `login_logout_times` (
  `login_datetime` datetime NOT NULL,
  `logout_datetime` datetime DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login_logout_times`
--

INSERT INTO `login_logout_times` (`login_datetime`, `logout_datetime`, `user_id`) VALUES
('2021-12-23 21:09:23', NULL, 772328112),
('2021-12-23 21:31:45', NULL, 2147483647),
('2021-12-23 22:09:04', NULL, 872219334),
('2021-12-23 22:16:33', NULL, 872219334),
('2021-12-23 22:18:16', NULL, 2147483647),
('2021-12-23 22:21:32', NULL, 872219334),
('2021-12-23 22:27:12', NULL, 872219334),
('2021-12-23 22:27:16', NULL, 2147483647),
('2021-12-24 08:52:54', NULL, 772328112),
('2021-12-24 08:59:48', NULL, 772328112),
('2021-12-24 09:35:01', NULL, 772328112),
('2021-12-24 09:35:10', NULL, 772328112);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `barcode` varchar(255) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `size` enum('XS','S','M','L','XL','2XL','3XL') DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `material` varchar(50) DEFAULT NULL,
  `hidden` tinyint(1) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`barcode`, `name`, `quantity`, `size`, `color`, `price`, `material`, `hidden`, `user_id`) VALUES
('123', 'old wallet', 0, 'M', 'leather color', 10, 'fake leather', 1, NULL),
('21235', 'hatta', 12, 'S', 'black & white', 100, 'cotton', 0, NULL),
('278001122', 'thob', 50, 'L', 'black and red', 200, 'cotton', 0, NULL),
('569982', 'traditional cap', 69, 'L', 'green', 70, 'generic', 0, NULL),
('665200', 'wallets', 15, 'M', 'black', 50, 'genuine leather', 0, NULL),
('776540098', 'Qamis', 70, 'L', 'white', 100, 'cotton', 0, NULL),
('88033044', 'bracelet', 100, 'S', 'silver, gold', 40, 'stainless steel', 0, NULL),
('887540012', 'Kofieh', 100, 'L', 'white', 300, 'cotton', 0, NULL),
('99800227', 'Shirwal', 30, 'L', 'white', 2700, 'cotton', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `firstname` varchar(30) DEFAULT NULL,
  `lastname` varchar(30) DEFAULT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `firstname`, `lastname`, `gender`, `username`, `password`, `role`, `email`) VALUES
(77643098, 'Baraa', 'Abu Ajamieh', NULL, 'baraa', '$2b$15$TbO7ZcjlqQ5lwBRy.rm9eeonjUQiiEjK/Yf437ievssT1AQTfi7/G', 'admin', 'baraa@teamF.edu'),
(772328112, 'David', 'Raffaele', NULL, 'david', '$2b$15$V9Z.wsCFmkX/GCwR7vzRxO7SopZfoNOmxV65vNZHTN9CAW9TZGSBS', 'admin', 'davidr@dizayni.com'),
(779292283, 'Saleeba', 'Dalleh', NULL, 'saleeba', '$2b$15$7gxSITp/n7M191zGOpzB3.ul3sTFHKWfjAPyYCx996gzdYMbjqnFm', 'admin', 'saleeba@teamF.edu'),
(872219334, 'George', 'Hazboun', NULL, 'george', '$2b$15$MsyFqSKOpo9q/uV3XPjt/Om0nx1DgtanDIugUhHiaFslT5diThgg.', 'admin', 'george@teamF.edu'),
(881920031, 'Jhon', 'Blanchett', NULL, 'jhon', '$2b$15$op87qG1MvP5LC1hR2iCheuGu2KB2P/OCwdfCw6UpXK2SXA5VqwgeC', 'admin', 'jhonb@dizayni.com'),
(891112343, 'Sara', 'McCauley', NULL, 'sara', '$2b$15$1pxdf3ystbBPRF3ptf/Rn.wZ0E/Mgy1caHM5MNJ.YFbv686ZJAt4y', 'staff', 'sara@gmail.com'),
(899201203, 'Aseel', 'Shakarnah', NULL, 'aseel', '$2b$15$a0j4I8ydvnIicSdgGwJoMekwWDkJe8G6GqW5y4pkBF1AaN/ON9d5i', 'admin', 'aseel@teamF.edu'),
(2147483647, 'Mohammad', 'Suriya', NULL, 'mohammad', '$2b$15$N8DyTwzFnlKXbZOTuH61eeFbJayt9k0X6JBhcegFUOiz4Nfu2Yjiq', 'staff', 'mohammad@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`bill_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `bill_items`
--
ALTER TABLE `bill_items`
  ADD PRIMARY KEY (`bill_item_id`,`bill_id`),
  ADD KEY `bill_id` (`bill_id`),
  ADD KEY `barcode` (`barcode`);

--
-- Indexes for table `customer_queue`
--
ALTER TABLE `customer_queue`
  ADD PRIMARY KEY (`cart_id`,`user_id`,`barcode`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `barcode` (`barcode`);

--
-- Indexes for table `login_logout_times`
--
ALTER TABLE `login_logout_times`
  ADD PRIMARY KEY (`login_datetime`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`barcode`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`) USING BTREE,
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bill`
--
ALTER TABLE `bill`
  MODIFY `bill_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `bill_items`
--
ALTER TABLE `bill_items`
  MODIFY `bill_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `customer_queue`
--
ALTER TABLE `customer_queue`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=772328113;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bill`
--
ALTER TABLE `bill`
  ADD CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bill_items`
--
ALTER TABLE `bill_items`
  ADD CONSTRAINT `bill_items_ibfk_1` FOREIGN KEY (`bill_id`) REFERENCES `bill` (`bill_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bill_items_ibfk_2` FOREIGN KEY (`barcode`) REFERENCES `product` (`barcode`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `customer_queue`
--
ALTER TABLE `customer_queue`
  ADD CONSTRAINT `customer_queue_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `customer_queue_ibfk_2` FOREIGN KEY (`barcode`) REFERENCES `product` (`barcode`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `login_logout_times`
--
ALTER TABLE `login_logout_times`
  ADD CONSTRAINT `login_logout_times_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
