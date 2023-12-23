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


CREATE DATABASE `db_restaurant` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

--
-- Table structure for table `billdetails`
--

DROP TABLE IF EXISTS `billdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billdetails` (
  `bill_id` int(11) NOT NULL,
  `food_id` varchar(5) NOT NULL,
  `item_qty` int(11) DEFAULT NULL,
  PRIMARY KEY (`bill_id`,`food_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billdetails`
--

LOCK TABLES `billdetails` WRITE;
/*!40000 ALTER TABLE `billdetails` DISABLE KEYS */;
INSERT INTO `billdetails` VALUES (1,'6',1),(1,'7',1),(2,'6',1),(2,'7',1),(3,'1',1),(3,'2',1),(4,'11',1),(4,'15',1),(5,'10',1),(5,'11',1),(5,'7',1),(5,'8',1),(6,'7',1),(7,'6',1),(7,'7',1),(8,'6',1),(8,'7',1),(9,'6',1),(9,'7',1),(10,'6',1),(10,'7',1),(11,'7',1),(11,'9',1),(12,'2',1),(12,'5',1),(13,'10',1),(13,'6',1),(14,'10',1),(14,'7',1),(15,'6',1),(15,'7',1),(16,'11',1),(16,'7',1),(17,'6',1),(18,'7',1),(18,'9',1),(19,'6',1),(19,'7',1),(20,'7',1),(20,'9',1),(21,'10',1),(21,'6',1),(22,'10',1),(22,'6',1),(23,'7',1),(24,'2',1),(24,'5',1),(25,'2',1),(26,'7',1),(27,'6',1),(28,'6',1),(29,'6',1),(29,'7',1),(30,'6',1),(30,'7',3),(31,'11',1),(31,'7',2),(32,'7',2),(33,'6',2),(33,'9',1),(34,'6',2),(34,'9',4),(35,'6',1),(35,'9',1),(36,'6',1),(37,'12',1),(37,'6',1),(37,'7',1),(38,'6',1),(38,'7',1),(39,'1',1),(39,'5',1),(40,'6',1),(40,'7',1),(41,'6',1),(41,'7',1),(42,'1',1),(42,'5',1),(43,'6',1),(43,'7',1),(44,'6',1),(44,'7',1),(45,'10',1),(45,'6',1),(46,'6',1),(46,'7',1),(47,'6',2),(48,'7',1),(49,'6',1),(49,'7',1),(50,'10',1),(50,'6',1),(51,'7',1),(51,'9',1),(52,'3',1),(52,'8',1),(53,'10',1),(53,'6',1),(54,'1',1),(54,'2',1),(54,'3',1),(55,'6',1),(55,'8',1),(56,'6',1),(56,'7',1),(57,'10',1),(57,'6',1),(58,'6',1),(58,'8',1),(58,'9',1),(59,'6',1),(59,'7',1),(60,'10',2),(63,'6',1),(64,'10',3),(64,'8',2),(65,'2',2),(65,'5',1),(65,'7',1),(66,'10',1),(66,'7',1),(66,'9',1),(67,'13',4),(67,'6',1),(68,'5',1),(68,'8',1),(69,'10',1),(69,'7',1),(70,'2',1),(70,'3',1),(71,'7',1),(72,'2',1),(72,'5',1),(73,'10',1),(73,'7',1),(74,'6',1),(74,'7',1),(75,'10',1),(75,'6',1),(76,'2',1),(76,'4',1),(77,'2',1),(77,'5',1),(78,'7',1),(78,'9',1),(79,'1',2),(79,'5',2),(79,'6',2),(79,'8',2),(79,'9',2),(80,'1',1),(80,'5',1),(81,'10',1),(81,'6',1),(82,'10',1),(82,'7',1),(82,'9',1),(83,'11',1),(83,'6',1),(83,'8',1),(84,'1',1),(84,'4',1),(84,'5',1),(85,'6',1),(85,'7',1),(86,'1',1),(86,'5',1),(87,'13',1),(87,'6',1),(88,'13',1),(88,'6',1),(88,'7',1),(89,'10',1),(89,'6',1),(90,'1',1),(90,'4',1);
/*!40000 ALTER TABLE `billdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `billstatus`
--

DROP TABLE IF EXISTS `billstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billstatus`
--

LOCK TABLES `billstatus` WRITE;
/*!40000 ALTER TABLE `billstatus` DISABLE KEYS */;
INSERT INTO `billstatus` VALUES (1,700665161,'23','4','2023-12-15T18:23','cash',0,0,18,'false',1,NULL,NULL),(2,145619809,'23','4','2023-12-15T18:25','cash',0,0,18,'false',1,NULL,NULL),(3,520020032,'45','','2023-12-15T18:27','cash',0,0,11,'false',1,NULL,NULL),(4,59658372,'34','443','2023-12-15T18:31','cash',0,0,4,'false',1,NULL,NULL),(5,191950290,'23','4','2023-12-15T18:32','cash',0,0,30,'false',1,NULL,NULL),(6,999981970,'78','2','2023-12-15T18:34','cash',0,0,10,'false',1,NULL,NULL),(7,409452516,'34','5','2023-12-15T18:38','cash',0,0,18,'false',1,NULL,NULL),(8,339935988,'23','4','2023-12-15T18:40','cash',0,0,18,'false',1,NULL,NULL),(9,273341713,'23','4','2023-12-15T18:40','cash',0,0,18,'false',1,NULL,NULL),(10,277839105,'23','4','2023-12-15T18:41','cash',0,0,18,'false',1,NULL,NULL),(11,105629457,'2','23','2023-12-15T18:43','cash',0,0,22,'false',1,NULL,NULL),(12,236498401,'23dwcwe','','2023-12-15T18:45','cash',0,0,11,'false',1,NULL,NULL),(13,230757131,'23','4','2023-12-15T18:46','cash',0,0,18,'false',1,NULL,NULL),(14,88435301,'78','878','2023-12-15T18:48','cash',0,0,20,'false',1,NULL,NULL),(15,663165035,'23','4','2023-12-15T18:49','cash',0,0,18,'false',1,NULL,NULL),(16,50427998,'A23','4','2023-12-15T18:51','cash',0,0,11,'false',1,NULL,NULL),(17,3287751,'23','4','2023-12-15T18:52','cash',0,0,8,'false',1,NULL,NULL),(18,198040157,'A23','3','2023-12-15T18:54','cash',0,0,22,'false',1,NULL,NULL),(19,987240768,'23','4','2023-12-15T18:56','cash',0,0,18,'false',1,NULL,NULL),(20,813967480,'A23','3','2023-12-15T18:57','cash',0,0,22,'false',1,NULL,NULL),(21,732973765,'23','4','2023-12-15T18:59','cash',0,0,18,'false',1,NULL,NULL),(22,457547679,'A34','3','2023-12-15T18:59','cash',0,0,18,'false',1,NULL,NULL),(23,904171486,'23','4','2023-12-15T19:01','cash',0,0,10,'false',1,NULL,NULL),(24,300308808,'Afrf','','2023-12-15T19:02','cash',0,0,11,'false',1,NULL,NULL),(25,606528543,'wewe','','2023-12-15T19:03','cash',0,0,5,'false',1,NULL,NULL),(26,799396646,'A56','2','2023-12-15T19:04','cash',0,0,10,'false',1,NULL,NULL),(27,39919182,'23','4','2023-12-15T19:07','cash',0,0,8,'false',1,NULL,NULL),(28,760480644,'23','4','2023-12-15T19:09','cash',0,0,8,'false',1,NULL,NULL),(29,98603585,'B554','3','2023-12-15T19:12','cash',0,0,18,'false',1,NULL,NULL),(30,509923303,'S23','4','2023-12-15T19:17','cash',0,0,38,'false',1,NULL,NULL),(31,509923303,'23','4','2023-12-15T19:19','cash',0,0,21,'false',1,NULL,NULL),(32,509923303,'23','4','2023-12-15T19:20','cash',0,0,20,'false',1,NULL,NULL),(33,851169006,'56','3','2023-12-15T19:22','cash',0,0,28,'false',1,NULL,NULL),(34,851169006,'54','2','2023-12-15T19:23','cash',0,0,64,'false',1,NULL,NULL),(35,953609409,'65','2','2023-12-15T19:26','cash',0,0,20,'false',1,NULL,NULL),(36,352711265,'23','43','2023-12-15T19:27','cash',0,0,8,'false',1,NULL,NULL),(37,506217975,'56','2','2023-12-15T19:29','cash',0,0,19,'false',1,NULL,NULL),(38,459596381,'56','1','2023-12-15T19:30','cash',0,0,18,'false',1,NULL,NULL),(39,470493988,'Awew','','2023-12-15T19:31','cash',0,0,12,'false',1,NULL,NULL),(40,510095594,'34','2','2023-12-15T19:33','cash',0,0,18,'false',1,NULL,NULL),(41,83533840,'23','3','2023-12-15T19:33','cash',0,0,18,'false',1,NULL,NULL),(42,731632715,'Swe','','2023-12-15T19:34','cash',0,0,12,'false',1,NULL,NULL),(43,783815884,'44','28','2023-12-15T19:34','cash',0,0,18,'false',1,NULL,NULL),(44,160524430,'67','2','2023-12-15T19:37','cash',0,0,18,'false',1,NULL,NULL),(45,226902943,'23','4','2023-12-15T19:38','cash',0,0,18,'false',1,NULL,NULL),(46,644879987,'65','2','2023-12-15T19:38','cash',0,0,18,'false',1,NULL,NULL),(47,774514514,'32','32','2023-12-15T19:43','cash',0,0,16,'false',1,NULL,NULL),(48,403448250,'43','43','2023-12-15T19:48','cash',0,0,10,'false',1,NULL,NULL),(49,115170596,'23','4','2023-12-15T20:03','cash',0,0,18,'false',1,NULL,NULL),(50,925125716,'34q45','2','2023-12-15T20:14','cash',0,0,18,'false',1,NULL,NULL),(51,365699272,'T','3','2023-12-15T20:14','cash',0,0,22,'false',1,NULL,NULL),(52,498579122,'Swwe','','2023-12-17T17:07','cash',0,0,14,'false',1,NULL,NULL),(53,103314182,'23','4','2023-12-17T17:16','cash',0,0,18,'false',1,NULL,NULL),(54,541313062,'56','','2023-12-17T17:20','cash',0,0,16,'false',1,NULL,NULL),(55,569106996,'45','3','2023-12-17T17:21','cash',0,0,17,'false',1,NULL,NULL),(56,503739527,'23','4','2023-12-17T17:21','cash',0,0,18,'false',1,NULL,NULL),(57,769333684,'23','4','2023-12-17T17:23','cash',0,0,18,'false',1,NULL,NULL),(58,367569203,'45','3','2023-12-17T17:24','cash',0,0,29,'false',1,NULL,NULL),(59,706514242,'23','4','2023-12-17T17:26','cash',0,0,18,'true',6,NULL,NULL),(60,948446073,'34','5','2023-12-17T18:06','cash',0,0,20,'false',1,NULL,NULL),(63,835814940,'23','4','2023-12-17T18:08','cash',0,0,8,'false',1,NULL,NULL),(64,219860211,'56','5','2023-12-17T18:08','cash',0,0,48,'false',1,NULL,NULL),(65,143390983,'Giennnie','','2023-12-17T20:24','cash',0,0,27,'false',1,NULL,NULL),(66,14921661,'23','4','2023-12-17T20:28','cash',0,0,33,'false',1,NULL,NULL),(67,240393173,'23','3','2023-12-17T20:37','cash',0,0,18,'false',1,NULL,NULL),(68,578082025,'','','2023-12-17T20:38','cash',0,0,16,'false',1,NULL,NULL),(69,365431899,'200','3','2023-12-17T20:40','cash',0,0,21,'false',1,NULL,NULL),(70,961257484,'','','2023-12-17T20:45','cash',0,0,10,'false',1,NULL,NULL),(71,980449356,'223','4','2023-12-17T20:46','cash',0,0,10,'false',1,NULL,NULL),(72,405007532,'','','2023-12-17T20:51','cash',0,0,12,'false',1,NULL,NULL),(73,143649426,'23','4','2023-12-17T20:56','cash',0,0,21,'false',1,NULL,NULL),(74,992450921,'23','4','2023-12-17T20:57','cash',0,0,18,'false',1,NULL,NULL),(75,185023576,'23','4','2023-12-17T20:59','cash',0,0,19,'false',1,NULL,NULL),(76,420514744,'','','2023-12-17T21:02','cash',0,0,11,'false',1,NULL,NULL),(77,453859569,'','','2023-12-17T21:08','cash',0,0,12,'false',1,NULL,NULL),(78,829656748,'23','4','2023-12-17T21:10','cash',0,0,22,'false',1,NULL,NULL),(79,437008284,'','','2023-12-17T21:12','cash',0,0,83,'false',1,NULL,NULL),(80,468263244,'','','2023-12-17T21:14','cash',0,0,13,'false',1,NULL,NULL),(81,621039907,'23','4','2023-12-17T21:23','cash',0,0,19,'false',1,NULL,NULL),(82,632553423,'23','4','2023-12-17T21:24','cash',0,0,33,'false',1,NULL,NULL),(83,99772953,'23','4','2023-12-17T21:25','cash',0,0,18,'false',1,NULL,NULL),(84,464500931,'','','2023-12-17T21:27','cash',0,0,19,'false',1,NULL,NULL),(85,552468073,'45','2','2023-12-18T15:42','cash',0,0,18,'false',1,NULL,NULL),(86,75281312,'','','2023-12-18T20:54','cash',0,0,13,'false',1,NULL,NULL),(87,230448973,'34','3','2023-12-20T17:34','cash',0,0,11,'false',1,NULL,NULL),(88,652392009,'78','2','2023-12-21T20:26','cash',0,0,21,'false',1,NULL,NULL),(89,936756545,'23','4','2023-12-22T16:57','cash',0,0,19,'false',1,'t',''),(90,376696975,'','','2023-12-22T20:33','cash',0,0,12,'false',1,'a','Gerdce');
/*!40000 ALTER TABLE `billstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booktable`
--

DROP TABLE IF EXISTS `booktable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booktable`
--

LOCK TABLES `booktable` WRITE;
/*!40000 ALTER TABLE `booktable` DISABLE KEYS */;
/*!40000 ALTER TABLE `booktable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `user_id` int(11) NOT NULL,
  `food_id` varchar(5) NOT NULL,
  `item_qty` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`food_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (24909679,'1',3),(24909679,'9',3),(53027350,'7',2),(64303148,'1',1),(64303148,'5',1),(98603585,'6',1),(98603585,'7',1),(105629457,'7',1),(105629457,'9',1),(177833604,'6',1),(198040157,'7',1),(198040157,'9',1),(226056151,'10',1),(226056151,'6',1),(230757131,'10',1),(230757131,'6',1),(236498401,'2',1),(236498401,'5',1),(273341713,'6',1),(273341713,'7',1),(275064192,'6',1),(275064192,'7',1),(277839105,'6',1),(277839105,'7',1),(283159752,'10',1),(516321407,'6',1),(517787971,'10',1),(517787971,'11',1),(548941323,'15',1),(548941323,'6',1),(589351988,'13',2),(589351988,'14',1),(589351988,'6',3),(628831404,'6',6),(628831404,'7',2),(685197416,'10',1),(685197416,'12',1),(685197416,'6',1),(685197416,'7',1),(726200456,'7',1),(726200456,'8',3),(785495871,'10',1),(785495871,'6',1),(884618832,'6',1),(884618832,'7',1),(903730921,'10',1),(903730921,'8',1),(903730921,'9',1),(913157024,'10',1),(913157024,'6',1),(958735199,'1',1),(958735199,'10',3),(958735199,'3',2),(958735199,'4',1);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogo_sagre`
--

DROP TABLE IF EXISTS `catalogo_sagre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `catalogo_sagre` (
  `id_sagra` varchar(100) NOT NULL,
  `descrizione` varchar(255) NOT NULL,
  `sigla` varchar(100) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `prenotazione` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_sagra`),
  UNIQUE KEY `catalogo_sagre_unique` (`sigla`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_sagre`
--

LOCK TABLES `catalogo_sagre` WRITE;
/*!40000 ALTER TABLE `catalogo_sagre` DISABLE KEYS */;
INSERT INTO `catalogo_sagre` VALUES ('001','Maggio Fiaschettano','mf','al',0),('002','Vigonovo','vg','a',1);
/*!40000 ALTER TABLE `catalogo_sagre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `esauriti`
--

DROP TABLE IF EXISTS `esauriti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `esauriti` (
  `food_id` varchar(5) NOT NULL,
  `esaurito` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`food_id`),
  UNIQUE KEY `esauriti_primary` (`food_id`),
  UNIQUE KEY `esauriti_un` (`food_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `esauriti`
--

LOCK TABLES `esauriti` WRITE;
/*!40000 ALTER TABLE `esauriti` DISABLE KEYS */;
INSERT INTO `esauriti` VALUES ('1',1),('10',1),('5',1);
/*!40000 ALTER TABLE `esauriti` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  `FlgPrenotazione` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`food_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food`
--

LOCK TABLES `food` WRITE;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
INSERT INTO `food` VALUES ('1','Pasta al ragù','5.0','999','6.00','0.00','gnocchi al ragù','normal','a','P','taco/taco-1.png',NULL,0,0,NULL,NULL,0),('10','Baccalà','5.0','999','10.50','0.00','Baccalà alla vicentina','normal','at','C','burrito/burrito-2.png',NULL,0,0,NULL,NULL,0),('11','Acqua naturale','5.0','999','1.00','0.00','acqua naturale','normal','t','B','burrito/burrito-3.png',NULL,0,0,NULL,NULL,0),('12','acqua frizzante','5.0','999','1.00','0.00','acqua frizzante','normal','t','B','burrito/burrito-4.png',NULL,0,0,NULL,NULL,0),('13','Coca-Cola','5.0','999','2.50','0.00','Coca-Cola','normal','t','B','burrito/burrito-5.png',NULL,0,0,NULL,NULL,0),('14','Fanta','5.0','999','2.50','0.00','Fanta','normal','t','B','burrito/burrito-6.png',NULL,0,0,NULL,NULL,0),('15','Birra piccola','5.0','999','3.50','0.00','Birra piccola','normal','t','B','nachos/nachos-1.png',NULL,0,0,NULL,NULL,0),('16','Birra media','5.0','999','4.00','0.00','Birra media','normal','t','B','nachos/nachos-2.png',NULL,0,0,NULL,NULL,0),('17','Calice vino','5.0','999','5.00','0.00','Calice vino Merlot','normal','t','B','nachos/nachos-3.png',NULL,0,0,NULL,NULL,0),('18','Sprite','5.0','999','2.50','0.00','sprite','normal','t','B','nachos/nachos-3.png',NULL,0,0,NULL,NULL,0),('19','Polletto alla griglia','5.0','999','12.00','0.00','Specialità','normal','PRE','C',NULL,NULL,0,0,NULL,NULL,0),('2','Gnocchi al pomodoro con formaggio','5.0','999','5.00','0.00','gnocchi al pomodoro','normal','a','P','taco/taco-2.png',NULL,0,0,NULL,NULL,0),('3','pasta in bianco','5.0','999','5.00','0.00','pasta in bianco','normal','a','P','taco/taco-3.png',NULL,0,0,NULL,NULL,0),('4','pasta al pomodoro','5.0','999','6.00','0.00','pasta al pomodoro','normal','a','P','taco/taco-4.png',NULL,0,0,NULL,NULL,0),('5','gnocchi al ragù','5.0','999','6.50','0.00','pasta la ragù','normal','a','P','taco/taco-5.png',NULL,0,0,NULL,NULL,0),('6','Braciola','5.0','999','8.00','0.00','braciole di maiale cucinate in padella','normal','at','C','taco/taco-6.png',NULL,0,0,NULL,NULL,0),('7','Grigliata','5.0','999','10.00','0.00','grigliata mista di carne','normal','at','C','taco/taco-7.png',NULL,0,0,NULL,NULL,0),('8','Piatto pollo','5.0','999','9.00','0.00','coscia e petto di pollo cucinati all piastra','normal','at','C','taco/taco-8.png',NULL,0,0,NULL,NULL,0),('9','Calamari fritti','5.0','999','12.00','0.00','calamari fritti','normal','at','C','burrito/burrito-1.png',NULL,0,0,NULL,NULL,0);
/*!40000 ALTER TABLE `food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (3287751,'Utente3287751','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(14921661,'Utente14921661','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(21043734,'Utente21043734','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(24909679,'Utente24909679','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(30940242,'Utente30940242','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(33507940,'Utente33507940','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(35377234,'Utente35377234','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(38223868,'Utente38223868','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(39551236,'Utente39551236','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(39919182,'Utente39919182','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(42369165,'Utente42369165','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(50427998,'Utente50427998','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(53027350,'Utente53027350','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(59658372,'Utente59658372','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(64303148,'Utente64303148','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(75281312,'Utente75281312','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(83533840,'Utente83533840','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(87590845,'Utente87590845','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(88435301,'Utente88435301','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(98603585,'Utente98603585','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(99772953,'Utente99772953','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(103314182,'Utente103314182','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(105629457,'Utente105629457','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(115170596,'Utente115170596','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(130550018,'Utente130550018','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(143390983,'Utente143390983','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(143649426,'Utente143649426','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(145619809,'Utente145619809','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(160524430,'Utente160524430','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(171488188,'Utente171488188','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(177833604,'Utente177833604','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(185023576,'Utente185023576','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(191950290,'Utente191950290','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(196801926,'Utente196801926','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(198040157,'Utente198040157','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(218622344,'Utente218622344','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(219860211,'Utente219860211','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(220959164,'Utente220959164','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(226056151,'Utente226056151','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(226902943,'Utente226902943','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(230448973,'Utente230448973','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(230757131,'Utente230757131','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(236498401,'Utente236498401','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(240393173,'Utente240393173','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(273341713,'Utente273341713','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(275064192,'Utente275064192','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(277839105,'Utente277839105','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(283159752,'Utente283159752','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(300308808,'Utente300308808','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(310481599,'Utente310481599','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(339935988,'Utente339935988','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(347696290,'Utente347696290','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(351247713,'Utente351247713','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(352711265,'Utente352711265','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(363838020,'Utente363838020','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(365431899,'Utente365431899','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(365699272,'Utente365699272','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(367569203,'Utente367569203','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(376696975,'Utente376696975','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(403448250,'Utente403448250','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(405007532,'Utente405007532','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(409452516,'Utente409452516','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(420514744,'Utente420514744','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(437008284,'Utente437008284','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(452457346,'Utente452457346','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(453859569,'Utente453859569','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(457547679,'Utente457547679','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(459596381,'Utente459596381','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(464500931,'Utente464500931','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(468263244,'Utente468263244','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(470493988,'Utente470493988','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(482608823,'Utente482608823','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(496184157,'Utente496184157','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(496638703,'Utente496638703','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(498579122,'Utente498579122','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(500537373,'Utente500537373','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(503739527,'Utente503739527','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(506217975,'Utente506217975','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(509923303,'Utente509923303','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(510095594,'Utente510095594','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(516321407,'Utente516321407','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(517787971,'Utente517787971','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(520020032,'Utente520020032','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(534345742,'Utente534345742','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(538953505,'Utente538953505','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(539708387,'Utente539708387','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(541313062,'Utente541313062','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(548941323,'Utente548941323','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(552468073,'Utente552468073','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(569106996,'Utente569106996','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(578082025,'Utente578082025','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(588148632,'Utente588148632','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(589351988,'Utente589351988','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(600795515,'Utente600795515','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(606528543,'Utente606528543','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(621039907,'Utente621039907','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(628831404,'Utente628831404','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(632553423,'Utente632553423','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(644879987,'Utente644879987','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(652392009,'Utente652392009','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(663165035,'Utente663165035','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(665784605,'Utente665784605','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(685197416,'Utente685197416','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(700665161,'Utente700665161','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(706514242,'Utente706514242','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(713445698,'Utente713445698','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(726200456,'Utente726200456','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(726929486,'Utente726929486','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(728845199,'Utente728845199','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(731632715,'Utente731632715','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(732973765,'Utente732973765','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(735428634,'Utente735428634','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(760480644,'Utente760480644','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(769333684,'Utente769333684','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(774514514,'Utente774514514','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(783815884,'Utente783815884','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(785495871,'Utente785495871','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(799396646,'Utente799396646','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(805951452,'Utente805951452','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(813967480,'Utente813967480','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(829656748,'Utente829656748','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(835814940,'Utente835814940','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(851169006,'Utente851169006','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(857731336,'Utente857731336','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(869700690,'Utente869700690','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(884618832,'Utente884618832','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(903730921,'Utente903730921','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(904171486,'Utente904171486','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(913157024,'Utente913157024','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(925125716,'Utente925125716','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(930030621,'Utente930030621','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(936756545,'Utente936756545','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(945150178,'Utente945150178','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(948446073,'Utente948446073','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(953609409,'Utente953609409','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(958735199,'Utente958735199','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(961257484,'Utente961257484','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(964984092,'Utente964984092','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(980393133,'Utente980393133','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(980449356,'Utente980449356','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(985612519,'Utente985612519','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(987240768,'Utente987240768','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(992450921,'Utente992450921','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(995855433,'Utente995855433','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male'),(999981970,'Utente999981970','exemple.exemple@gmail.com','+390000000000','Utente1','11223333','male');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'db_restaurant'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-23 17:43:02
