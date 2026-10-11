CREATE DATABASE  IF NOT EXISTS `palacinkarnica2026` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `palacinkarnica2026`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: palacinkarnica2026
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `dodaci`
--

DROP TABLE IF EXISTS `dodaci`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dodaci` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tip` enum('slana','slatka','prazna','') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `naziv` varchar(100) NOT NULL,
  `na_zalihama` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dodaci`
--

LOCK TABLES `dodaci` WRITE;
/*!40000 ALTER TABLE `dodaci` DISABLE KEYS */;
INSERT INTO `dodaci` VALUES (3,'slana','kulen',1),(4,'slana','pavlaka',1),(5,'slatka','eurokrem',1),(6,'slatka','nutela',0),(7,'slatka','visnja',1),(12,'slana','sunka',1),(13,'slana','masline',1),(14,'slatka','pistaci',1);
/*!40000 ALTER TABLE `dodaci` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `korisnici`
--

DROP TABLE IF EXISTS `korisnici`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `korisnici` (
  `korisnicko_ime` varchar(50) NOT NULL,
  `lozinka` varchar(200) NOT NULL,
  `ime` varchar(50) NOT NULL,
  `prezime` varchar(50) NOT NULL,
  `email` varchar(70) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `tip` varchar(50) NOT NULL,
  PRIMARY KEY (`korisnicko_ime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korisnici`
--

LOCK TABLES `korisnici` WRITE;
/*!40000 ALTER TABLE `korisnici` DISABLE KEYS */;
INSERT INTO `korisnici` VALUES ('joka','$2a$10$QcMe5H23myOy35bXyx0wae5wWvCxdyVx.Pnx4iv.qoIfdsrb6mmve','Jovana','Nestorov','jn@gmail.com','kupac'),('kaja','$2a$10$yTtx0zeB9GHp90YPekcBfeuL.55IEYWucNUhGhiVTNWveiM81RQTy','Katarina','Kajic','kaja@gmail.com','radnik'),('maja','$2a$10$9oSYKv1bXLYVIOuJE9kkZ.0lT112kZNCN3t4LURSm52wAOmVTL2ji','Maja','Majic','maja@gmail.com','radnik'),('maree','$2a$10$wTv1NA7hhwjgZJ0DKLolBue27KxrDz3SCAXwGYJ7B.Ui5/HdLIg/i','Marko','NAAsa','ss@gmail.com','kupac');
/*!40000 ALTER TABLE `korisnici` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `narudzbine`
--

DROP TABLE IF EXISTS `narudzbine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `narudzbine` (
  `id` int NOT NULL AUTO_INCREMENT,
  `korisnik` varchar(50) NOT NULL,
  `tip` enum('slana','slatka','prazna','') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `dodaci` varchar(250) NOT NULL,
  `pohovana` tinyint(1) NOT NULL,
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_korisnik` (`korisnik`),
  CONSTRAINT `fk_kor_nar` FOREIGN KEY (`korisnik`) REFERENCES `korisnici` (`korisnicko_ime`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `narudzbine`
--

LOCK TABLES `narudzbine` WRITE;
/*!40000 ALTER TABLE `narudzbine` DISABLE KEYS */;
INSERT INTO `narudzbine` VALUES (7,'joka','slana','plazma,sir',0,'prihvacena'),(8,'joka','slatka','nutela,visnja',0,'prihvacena'),(9,'maree','slatka','',0,'odbijena'),(10,'maree','slana','kulen,pavlaka',1,'prihvacena'),(11,'maree','prazna','',0,'odbijena'),(12,'joka','prazna','',0,'prihvacena'),(13,'joka','prazna','',0,'odbijena'),(14,'maree','slatka','eurokrem',0,'odbijena'),(15,'maree','prazna','',0,'prihvacena'),(16,'maree','slatka','eurokrem,visnja',0,'odbijena'),(17,'maree','slatka','eurokrem,pistaci',0,'odbijena'),(18,'joka','slana','pavlaka,masline',1,'prihvacena');
/*!40000 ALTER TABLE `narudzbine` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-11 13:34:29
