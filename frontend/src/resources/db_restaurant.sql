-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: db_restaurant
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


--CREATE DATABASE `db_restaurant` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

--
-- Table structure for table `billdetails`
--

-- db_restaurant.billstatus definition

CREATE TABLE `billstatus` (
  `bill_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `bill_tavolo` varchar(255) DEFAULT NULL,
  `bill_coperti` text DEFAULT NULL,
  `bill_when` varchar(255) DEFAULT NULL,
  `bill_method` varchar(255) DEFAULT NULL,
  `bill_discount` int(11) DEFAULT NULL,
  `bill_delivery` int(11) DEFAULT NULL,
  `bill_total` int(11) DEFAULT NULL,
  `bill_paid` varchar(255) DEFAULT NULL,
  `bill_status` int(11) DEFAULT NULL,
  `TipoCassa` varchar(1) DEFAULT NULL,
  `Nominativo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`bill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- db_restaurant.booktable definition

CREATE TABLE `booktable` (
  `book_id` int(11) NOT NULL AUTO_INCREMENT,
  `book_name` varchar(255) DEFAULT NULL,
  `book_phone` varchar(255) DEFAULT NULL,
  `book_people` int(11) DEFAULT NULL,
  `book_tables` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `book_when` varchar(255) DEFAULT NULL,
  `book_note` text DEFAULT NULL,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- db_restaurant.cart definition

CREATE TABLE `cart` (
  `user_id` int(11) NOT NULL,
  `food_id` varchar(5) NOT NULL,
  `item_qty` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`food_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- db_restaurant.catalogo_sagre definition

-- db_restaurant.catalogo_sagre definition

CREATE TABLE `catalogo_sagre` (
  `id_sagra` varchar(100) NOT NULL,
  `descrizione` varchar(255) NOT NULL,
  `sigla` varchar(100) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `flgPrenotazioni` tinyint(1) NOT NULL DEFAULT 0,
  `flgTavoli` tinyint(1) NOT NULL DEFAULT 0,
  `flgAsporto` tinyint(1) NOT NULL DEFAULT 0,
 `flgEliminacode` tinyint(1) NOT NULL DEFAULT 0,  
  PRIMARY KEY (`id_sagra`),
  UNIQUE KEY `catalogo_sagre_unique` (`sigla`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- db_restaurant.esauriti definition

CREATE TABLE `esauriti` (
  `food_id` varchar(5) NOT NULL,
  `QtaDisponibile` int(10) unsigned NOT NULL DEFAULT 1,
  PRIMARY KEY (`food_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- db_restaurant.food definition

CREATE TABLE `food` (
  `food_id` varchar(5) NOT NULL,
  `food_name` varchar(255) DEFAULT NULL,
  `food_star` varchar(255) DEFAULT NULL,
  `food_vote` varchar(255) DEFAULT NULL,
  `food_price` varchar(255) DEFAULT NULL,
  `food_discount` varchar(255) DEFAULT NULL,
  `food_desc` varchar(255) DEFAULT NULL,
  `food_status` varchar(255) DEFAULT NULL,
  `food_type` varchar(255) DEFAULT NULL,
  `food_category` varchar(255) DEFAULT NULL,
  `food_src` varchar(255) DEFAULT NULL,
  `IdReparto` varchar(1) DEFAULT NULL,
  `FlgDisabled` tinyint(1) DEFAULT 0,
  `FlgValidita` tinyint(1) DEFAULT 0,
  `DataInizioValidita` varchar(10) DEFAULT NULL,
  `DataFineValidita` varchar(10) DEFAULT NULL,
  `FlgPrenotabile` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`food_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- db_restaurant.`user` definition

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_phone` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `user_birth` varchar(255) DEFAULT NULL,
  `user_gender` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2147483648 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- db_restaurant.billdetails definition

CREATE TABLE `billdetails` (
  `bill_id` int(11) NOT NULL,
  `food_id` varchar(5) NOT NULL,
  `item_qty` int(11) DEFAULT NULL,
  PRIMARY KEY (`bill_id`,`food_id`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;