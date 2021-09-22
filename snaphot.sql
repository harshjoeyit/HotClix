-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 22, 2021 at 04:48 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `snaphot`
--

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `created_by` int(11) NOT NULL,
  `total_photos` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/* --
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `name`, `created_by`, `total_photos`, `created_at`) VALUES
(32, 'Sunsets', 11, 4, '2021-01-07 20:30:31'),
(33, 'Deep Down', 11, 3, '2021-01-07 20:30:39'),
(34, 'The Goa thing', 11, 1, '2021-01-07 20:30:53'),
(35, 'Morning Routine', 12, 4, '2021-01-07 20:55:55'),
(36, 'Kyrie Irving Moves', 12, 2, '2021-01-07 20:57:27'),
(37, 'Holiday in Valley', 12, 3, '2021-01-07 20:57:39'),
(38, 'Jordan Air', 13, 4, '2021-01-07 20:59:19'),
(39, 'The Nubraks', 13, 3, '2021-01-07 20:59:26'),
(40, 'The Eternals', 13, 0, '2021-01-07 21:02:09'),
(41, 'The Only', 12, 3, '2021-01-07 21:03:57'),
(43, 'My Second Gallery', 14, 2, '2021-01-07 21:13:29'); */

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `uploaded_by` int(11) NOT NULL,
  `gallery` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `extension` varchar(10) NOT NULL,
  `orientation` varchar(15) DEFAULT NULL,
  `file_url` varchar(255) NOT NULL,
  `thumbnail_url` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/* 
--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `uploaded_by`, `gallery`, `name`, `extension`, `orientation`, `file_url`, `thumbnail_url`, `created_at`) VALUES
(54, 11, 33, 'five', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/five_ac1c04cd-3669-43f8-93df-25c2a21f1984.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/five_ac1c04cd-3669-43f8-93df-25c2a21f1984_thumbnail.jpg', '2021-01-07 20:33:06'),
(55, 11, 33, 'four', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/four_976da744-3e0e-48ef-a424-88bfbe7920e0.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/four_976da744-3e0e-48ef-a424-88bfbe7920e0_thumbnail.jpg', '2021-01-07 20:33:56'),
(56, 11, 33, 'one', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/one_21864cfa-19a9-47a4-8cdc-fab2c0ae7ec7.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/one_21864cfa-19a9-47a4-8cdc-fab2c0ae7ec7_thumbnail.jpg', '2021-01-07 20:34:07'),
(57, 11, 34, '1607578346529_wallhaven-49ryx8', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/1607578346529_wallhaven-49ryx8_ca72c216-20aa-448f-a57a-5cdc7c87e560.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/1607578346529_wallhaven-49ryx8_ca72c216-20aa-448f-a57a-5cdc7c87e560_thumbnail.jpg', '2021-01-07 20:39:22'),
(58, 11, 32, 'ab', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/ab_2be6aef0-952a-4954-a638-f0f5737f1aed.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/ab_2be6aef0-952a-4954-a638-f0f5737f1aed_thumbnail.jpg', '2021-01-07 20:54:26'),
(59, 11, 32, 'cropped-1920-1080-254180', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/cropped-1920-1080-254180_a8efb6c2-c624-41b6-af77-38cedb93787d.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/cropped-1920-1080-254180_a8efb6c2-c624-41b6-af77-38cedb93787d_thumbnail.jpg', '2021-01-07 20:54:31'),
(60, 11, 32, 'l23_nba_lebron_james_sneakers_shoes_lebron_shoes_81185_1920x1200', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/l23_nba_lebron_james_sneakers_shoes_lebron_shoes_81185_1920x1200_3258d341-071d-461a-82a5-14dbf2ceadc3.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/l23_nba_lebron_james_sneakers_shoes_lebron_shoes_81185_1920x1200_3258d341-071d-461a-82a5-14dbf2ceadc3_thumbnail.jpg', '2021-01-07 20:54:34'),
(61, 11, 32, 'nba_2k12_game_basketball_ball_jump_sports_93939_2560x1080', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/nba_2k12_game_basketball_ball_jump_sports_93939_2560x1080_3a977f1c-06ff-40f6-b99b-7161f8e089b6.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/nba_2k12_game_basketball_ball_jump_sports_93939_2560x1080_3a977f1c-06ff-40f6-b99b-7161f8e089b6_thumbnail.jpg', '2021-01-07 20:54:37'),
(62, 12, 35, '45d35319730815562df4fc2f8e1', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/45d35319730815562df4fc2f8e1_aa367d97-2a52-4a67-8049-72ef658bc84b.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/45d35319730815562df4fc2f8e1_aa367d97-2a52-4a67-8049-72ef658bc84b_thumbnail.jpg', '2021-01-07 20:56:11'),
(63, 12, 35, 'derrick-rose-desktop-clipart-14', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/derrick-rose-desktop-clipart-14_baa615f1-216b-4cb3-93a6-4ad4e325cfbc.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/derrick-rose-desktop-clipart-14_baa615f1-216b-4cb3-93a6-4ad4e325cfbc_thumbnail.jpg', '2021-01-07 20:56:14'),
(64, 12, 35, 'kyrie_irving_cleveland_cavaliers_basketball_108271_3840x2400', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/kyrie_irving_cleveland_cavaliers_basketball_108271_3840x2400_86f5e1f7-5bf7-4191-8c02-6be4771e216b.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/kyrie_irving_cleveland_cavaliers_basketball_108271_3840x2400_86f5e1f7-5bf7-4191-8c02-6be4771e216b_thumbnail.jpg', '2021-01-07 20:56:21'),
(65, 12, 37, 'abstraction_passage_light_black_blue_413_1920x108022222212121313ll', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/abstraction_passage_light_black_blue_413_1920x108022222212121313ll_5c21003c-9c26-4387-92f4-775d58eae6af.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/abstraction_passage_light_black_blue_413_1920x108022222212121313ll_5c21003c-9c26-4387-92f4-775d58eae6af_thumbnail.jpg', '2021-01-07 20:58:00'),
(66, 12, 37, 'abstraction_passage_light_black_blue_413_1920x108022222222222225', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/abstraction_passage_light_black_blue_413_1920x108022222222222225_6380930a-2ce5-43b0-b12e-d5ff839613a2.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/abstraction_passage_light_black_blue_413_1920x108022222222222225_6380930a-2ce5-43b0-b12e-d5ff839613a2_thumbnail.jpg', '2021-01-07 20:58:04'),
(67, 12, 37, 'abstraction_passage_light_black_blue_413_1920x10802222222222222222', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/abstraction_passage_light_black_blue_413_1920x10802222222222222222_88e18525-ef01-4ec2-894a-7f35736c2482.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/abstraction_passage_light_black_blue_413_1920x10802222222222222222_88e18525-ef01-4ec2-894a-7f35736c2482_thumbnail.jpg', '2021-01-07 20:58:07'),
(68, 13, 39, 'g', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/g_b6a259da-d82a-4263-b61f-b0539799584b.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/g_b6a259da-d82a-4263-b61f-b0539799584b_thumbnail.jpg', '2021-01-07 20:59:42'),
(69, 13, 39, 'pi', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/pi_0bd58889-71e0-4975-9808-04bb0ee19806.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/pi_0bd58889-71e0-4975-9808-04bb0ee19806_thumbnail.jpg', '2021-01-07 20:59:45'),
(70, 13, 39, 'pp', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/pp_0f9dc90e-1e56-49c8-9fbb-c95cf4d809a1.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/pp_0f9dc90e-1e56-49c8-9fbb-c95cf4d809a1_thumbnail.jpg', '2021-01-07 20:59:47'),
(71, 13, 38, '985803', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/985803_c693cb9b-2ecc-435a-aba8-5c0cdb7e503d.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/985803_c693cb9b-2ecc-435a-aba8-5c0cdb7e503d_thumbnail.jpg', '2021-01-07 21:00:21'),
(72, 13, 38, 'b', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/b_9b2ebd59-be61-4534-bea4-31c21100ccde.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/b_9b2ebd59-be61-4534-bea4-31c21100ccde_thumbnail.jpg', '2021-01-07 21:00:25'),
(73, 13, 38, 'ppp', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/ppp_aa017802-95ae-4382-b81b-0d19b27dcdf1.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/ppp_aa017802-95ae-4382-b81b-0d19b27dcdf1_thumbnail.jpg', '2021-01-07 21:00:27'),
(74, 13, 38, 'y', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/y_964c66ac-2fca-44f5-9bee-2d02a69425cd.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/y_964c66ac-2fca-44f5-9bee-2d02a69425cd_thumbnail.jpg', '2021-01-07 21:00:31'),
(75, 12, 36, 'despicable_me_minion_character_99901_1920x1200', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/despicable_me_minion_character_99901_1920x1200_68866c45-fecd-4c29-9a32-2abf39e747aa.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/despicable_me_minion_character_99901_1920x1200_68866c45-fecd-4c29-9a32-2abf39e747aa_thumbnail.jpg', '2021-01-07 21:03:15'),
(76, 12, 36, 'Despicable Me Minion Hugging Bananas Android Wallpaper', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/Despicable%20Me%20Minion%20Hugging%20Bananas%20Android%20Wallpaper_a9bc07a8-c328-4b95-b7a8-91cbdcb144ee.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/Despicable%20Me%20Minion%20Hugging%20Bananas%20Android%20Wallpaper_a9bc07a8-c328-4b95-b7a8-91cbdcb144ee_thumbnail.jpg', '2021-01-07 21:03:19'),
(77, 12, 41, '1607541046195_wallhaven-95dpgk', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/1607541046195_wallhaven-95dpgk_66f53b83-651d-4d57-b93d-5bd2ad6c5742.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/1607541046195_wallhaven-95dpgk_66f53b83-651d-4d57-b93d-5bd2ad6c5742_thumbnail.jpg', '2021-01-07 21:04:24'),
(78, 12, 41, '1607571738738_wallhaven-nzokrv', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/1607571738738_wallhaven-nzokrv_672eb899-3610-4fab-85a1-9028620e21e2.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/1607571738738_wallhaven-nzokrv_672eb899-3610-4fab-85a1-9028620e21e2_thumbnail.jpg', '2021-01-07 21:04:29'),
(79, 12, 35, '1607569940806_wallhaven-eoemjl', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/1607569940806_wallhaven-eoemjl_33733047-e1d0-43c5-ab45-f205ed405b2f.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/1607569940806_wallhaven-eoemjl_33733047-e1d0-43c5-ab45-f205ed405b2f_thumbnail.jpg', '2021-01-07 21:06:22'),
(80, 12, 41, 'david_beckham-2560x1440 - Copy', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/david_beckham-2560x1440%20-%20Copy_dc1fc5f0-7184-4736-abc4-b610006eecd3.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/david_beckham-2560x1440%20-%20Copy_dc1fc5f0-7184-4736-abc4-b610006eecd3_thumbnail.jpg', '2021-01-07 21:10:07'),
(82, 14, 43, 'dodge_challenger_srt_demon_2018-1920x1200', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/dodge_challenger_srt_demon_2018-1920x1200_71ce212c-9bf3-4f24-82ca-96700486cf2f.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/dodge_challenger_srt_demon_2018-1920x1200_71ce212c-9bf3-4f24-82ca-96700486cf2f_thumbnail.jpg', '2021-01-07 21:13:58'),
(83, 14, 43, 'Download-Lamborghini-Aventador-Images-HD-Wallpaper', 'jpg', NULL, 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/Download-Lamborghini-Aventador-Images-HD-Wallpaper_686aa5ef-e76c-41e0-a067-12c93d7c9776.jpg', 'https://my-image-gallery.s3.ap-south-1.amazonaws.com/Download-Lamborghini-Aventador-Images-HD-Wallpaper_686aa5ef-e76c-41e0-a067-12c93d7c9776_thumbnail.jpg', '2021-01-07 21:14:02');

-- -------------------------------------------------------- */

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

/* INSERT INTO `users` (`id`, `username`, `email`, `image`, `password`) VALUES
(11, 'kevin', 'kevin@gmail.com', NULL, '$2a$10$ZA6GNR9k//rXATOF8g/qVOTvQnYEVpzpYQBdqGICW3m4lS1Iw.Esy'),
(12, 'derrick', 'derrick@gmail.com', NULL, '$2a$10$nvCAbC3g8nHpzhXAK18gI.oiua3p0PWpUZTtrx7sdRgwLt7pTLP1O'),
(13, 'michael', 'michael@gmail.com', NULL, '$2a$10$RtT1ZNh2xsyQvbf5RMZnFO435dx9jacnjmRlUfrmELEb9qpDktoYW'),
(14, 'harshit', 'harshit02gangwar@gmail.com', NULL, '$2a$10$LnW4ynr.70RnQgUvPsEDdOrkktyHr5J11teysiknlTpHZ2X/9fJsC'); */

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uploaded_by` (`uploaded_by`),
  ADD KEY `gallery` (`gallery`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gallery`
--
ALTER TABLE `gallery`
  ADD CONSTRAINT `created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `gallery` FOREIGN KEY (`gallery`) REFERENCES `gallery` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `uploaded_by` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
