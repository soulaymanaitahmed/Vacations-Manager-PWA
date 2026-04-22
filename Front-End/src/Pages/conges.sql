-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2026 at 02:21 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `conges`
--

-- --------------------------------------------------------

--
-- Table structure for table `conges`
--

CREATE TABLE `conges` (
  `id` int(11) NOT NULL,
  `personnel_id` int(11) NOT NULL,
  `decision` int(2) NOT NULL DEFAULT 0,
  `type` int(2) NOT NULL,
  `total_duration` int(3) NOT NULL,
  `year_1` year(4) NOT NULL,
  `duration_1` int(3) NOT NULL,
  `year_2` year(4) DEFAULT NULL,
  `duration_2` int(3) DEFAULT NULL,
  `start_at` date NOT NULL,
  `end_at` date NOT NULL,
  `demand_date` date NOT NULL,
  `justification` tinyint(1) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `quitter` tinyint(1) NOT NULL DEFAULT 0,
  `cancel` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `conges`
--

INSERT INTO `conges` (`id`, `personnel_id`, `decision`, `type`, `total_duration`, `year_1`, `duration_1`, `year_2`, `duration_2`, `start_at`, `end_at`, `demand_date`, `justification`, `created_at`, `quitter`, `cancel`) VALUES
(10, 37, 1, 1, 6, '2025', 6, NULL, NULL, '2025-08-13', '2025-08-22', '2025-08-12', NULL, '2025-08-12 22:20:36', 0, 0),
(11, 37, 5, 1, 0, '2028', 5, NULL, NULL, '0000-00-00', '0000-00-00', '0000-00-00', NULL, '2025-08-12 22:29:58', 0, 0),
(12, 37, 0, 1, 4, '2025', 4, NULL, NULL, '2025-12-13', '2025-12-23', '2025-12-10', NULL, '2025-12-10 19:22:18', 0, 2),
(13, 40, 21, 2, 6, '2025', 6, NULL, NULL, '2025-12-16', '2025-12-21', '2025-12-11', NULL, '2025-12-10 19:22:47', 0, 0),
(14, 41, 0, 1, 10, '2025', 10, NULL, NULL, '2025-12-18', '2026-01-01', '2025-12-08', NULL, '2025-12-10 19:23:32', 0, 0),
(15, 37, 5, 1, 0, '2025', 17, NULL, NULL, '0000-00-00', '0000-00-00', '0000-00-00', NULL, '2026-04-22 01:16:57', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `corps`
--

CREATE TABLE `corps` (
  `id` int(11) NOT NULL,
  `corp` varchar(100) NOT NULL,
  `corp_nbr` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `corps`
--

INSERT INTO `corps` (`id`, `corp`, `corp_nbr`) VALUES
(1, 'Administrative et Technique', 1),
(2, 'Médical', 2),
(3, 'Paramédical', 3),
(23, 'Test', NULL),
(24, 'test 2', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `formation_sanitaires`
--

CREATE TABLE `formation_sanitaires` (
  `id` int(11) NOT NULL,
  `formation_sanitaire` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `formation_sanitaires`
--

INSERT INTO `formation_sanitaires` (`id`, `formation_sanitaire`) VALUES
(28, 'Ouarzazate'),
(29, 'Taznakht'),
(31, 'Anzale'),
(32, 'Marrakech'),
(33, 'Test');

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `id` int(11) NOT NULL,
  `grade` varchar(100) NOT NULL,
  `corp_id` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grades`
--

INSERT INTO `grades` (`id`, `grade`, `corp_id`) VALUES
(2, 'Grade 1', 3),
(14, 'Grade 8', 3),
(15, 'Grade 2', 1),
(16, 'Grad 3', 1),
(17, 'Grad 5', 1),
(18, 'Grade 2', 2),
(19, 'Grad 3', 2),
(20, 'Grad 3', 3),
(21, 'Test 666666666', 3);

-- --------------------------------------------------------

--
-- Table structure for table `holidays`
--

CREATE TABLE `holidays` (
  `id` int(11) NOT NULL,
  `year` year(4) NOT NULL,
  `start_date` date NOT NULL,
  `duration` int(3) NOT NULL,
  `end_date` date NOT NULL,
  `hname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `holidays`
--

INSERT INTO `holidays` (`id`, `year`, `start_date`, `duration`, `end_date`, `hname`) VALUES
(18, '2026', '2026-01-01', 2, '2026-01-02', 'رأس السنة'),
(19, '2026', '2026-01-11', 1, '2026-01-11', 'وثيقة الاستقلال'),
(20, '2026', '2026-05-01', 1, '2026-05-01', 'عيد الشغل'),
(21, '2026', '2026-07-07', 1, '2026-07-07', 'فاتح محرم'),
(22, '2026', '2026-07-30', 1, '2026-07-30', 'عيد العرش'),
(23, '2026', '2026-08-14', 1, '2026-08-14', 'وادي الذهب'),
(26, '2026', '2026-09-15', 2, '2026-09-16', 'ذكرى المولد النبوي'),
(27, '2026', '2026-11-18', 1, '2026-11-18', 'عيد الاستقلال'),
(28, '2026', '2026-03-12', 1, '2026-03-12', 'tester'),
(29, '2026', '2026-03-18', 2, '2026-03-19', 'test 2'),
(30, '2026', '2026-08-21', 1, '2026-08-21', 'عيد الشباب'),
(31, '2026', '2026-08-13', 1, '2026-08-13', 'test3'),
(32, '2026', '2026-08-13', 1, '2026-08-13', 'test3'),
(33, '2026', '2026-03-13', 1, '2026-03-13', 'test3'),
(34, '2026', '2026-08-20', 1, '2026-08-20', 'Tester'),
(35, '2025', '2025-08-15', 2, '2025-08-16', 'Test 01'),
(36, '2025', '2025-08-26', 3, '2025-08-28', 'Test 01'),
(39, '2025', '2025-12-16', 3, '2025-12-18', 'tt'),
(40, '2025', '2025-02-12', 5, '2025-02-16', 'Test 02');

-- --------------------------------------------------------

--
-- Table structure for table `infos`
--

CREATE TABLE `infos` (
  `delegue` varchar(50) NOT NULL,
  `delegue_gender` int(11) NOT NULL DEFAULT 1,
  `etablissement` varchar(50) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `infos`
--

INSERT INTO `infos` (`delegue`, `delegue_gender`, `etablissement`, `id`) VALUES
('Mr. Test', 1, 'GGG', 1),
('Mr. Test', 1, 'GGG', 1);

-- --------------------------------------------------------

--
-- Table structure for table `personnels`
--

CREATE TABLE `personnels` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `ppr` varchar(10) NOT NULL,
  `cin` varchar(15) NOT NULL,
  `grade` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `phone` int(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `date_affect` date NOT NULL,
  `gander` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `personnels`
--

INSERT INTO `personnels` (`id`, `nom`, `prenom`, `ppr`, `cin`, `grade`, `type`, `phone`, `email`, `date_affect`, `gander`) VALUES
(37, 'Ait Ahmed', 'Rafik', '130099907', 'P347777', 15, 20, 766911555, 'soulaymanaitahmed39@gmail.com', '2024-02-12', 1),
(38, 'Alami', 'Rafik', '39113922', 'T4456778', 14, 13, 655782109, 'alami@gmail.com', '2025-08-15', 1),
(39, 'Samiai', 'Ali', '123466', 'P344777', 17, 13, 2147483647, 'hdflkdgfd@gmail.com', '2025-12-07', 1),
(40, 'Alaoi', 'Mariem', '1234668', 'P3555', 2, 20, 888898989, 'ggg@gmail.com', '2025-12-12', 2),
(41, 'Alami', 'Rida', '465645645', 'P34777799', 18, 21, 2147483647, 'jjjjjjggg@gmail.com', '2025-12-03', 1);

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `type` varchar(100) NOT NULL,
  `fs_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`id`, `type`, `fs_id`) VALUES
(13, 'Délégation', 28),
(16, 'PPP', 31),
(18, 'SRES', 28),
(19, 'Boughafer', 28),
(20, 'SRES 02', 29),
(21, 'SRES 01', 31);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) DEFAULT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `type` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `nom`, `prenom`, `type`) VALUES
(2, 'admin', '3911', 'Admin', 'Admin 1', 20),
(3, 'br01', '3911', 'BR', 'BR 1', 1),
(4, 'ch01', '3911', 'CH', 'CH 1', 2),
(5, 'de01', '3911', 'DE', 'DE 1', 3),
(6, 'rh01', '3911', 'DL', 'RH 2', 4),
(12, 'test01', '3911', '01', 'Test', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `conges`
--
ALTER TABLE `conges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `person_conge` (`personnel_id`);

--
-- Indexes for table `corps`
--
ALTER TABLE `corps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `formation_sanitaires`
--
ALTER TABLE `formation_sanitaires`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grade-corp` (`corp_id`);

--
-- Indexes for table `holidays`
--
ALTER TABLE `holidays`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personnels`
--
ALTER TABLE `personnels`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cin` (`cin`),
  ADD UNIQUE KEY `ppr` (`ppr`),
  ADD KEY `grade` (`grade`),
  ADD KEY `type` (`type`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tp_fs` (`fs_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `conges`
--
ALTER TABLE `conges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `corps`
--
ALTER TABLE `corps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `formation_sanitaires`
--
ALTER TABLE `formation_sanitaires`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `holidays`
--
ALTER TABLE `holidays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `personnels`
--
ALTER TABLE `personnels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `conges`
--
ALTER TABLE `conges`
  ADD CONSTRAINT `person_conge` FOREIGN KEY (`personnel_id`) REFERENCES `personnels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `grades`
--
ALTER TABLE `grades`
  ADD CONSTRAINT `grade-corp` FOREIGN KEY (`corp_id`) REFERENCES `corps` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `personnels`
--
ALTER TABLE `personnels`
  ADD CONSTRAINT `grade` FOREIGN KEY (`grade`) REFERENCES `grades` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `type` FOREIGN KEY (`type`) REFERENCES `types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `types`
--
ALTER TABLE `types`
  ADD CONSTRAINT `tp_fs` FOREIGN KEY (`fs_id`) REFERENCES `formation_sanitaires` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
