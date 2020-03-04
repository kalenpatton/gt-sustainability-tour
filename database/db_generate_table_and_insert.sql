--
-- Generates locations table and inserts location information into that table
--

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
-- Table structure for table `locations`
--
CREATE DATABASE IF NOT EXISTS location_info;
USE location_info;
DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(8000) NOT NULL DEFAULT 'No description provided.',
  `transcript` varchar(8000) NOT NULL DEFAULT 'No transcript provided.',
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `filters` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `idusers` int NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`idusers`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='users for login\n';
--
-- Data for table `locations`
--
LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,'Caddell Building','No description provided.','No transcript provided.',33.7767,-84.3969,NULL),(2,'Campus Recreation Center (CRC)','No description provided.','No transcript provided.',33.7755,-84.4034,NULL),(3,'Carbon Neutral Energy Solutions Lab (CNES)','No description provided.','No transcript provided.',33.7709,-84.402,NULL),(4,'Chapin Building','No description provided.','No transcript provided.',33.7733,-84.3953,NULL),(5,'Clough Undergraduate Learning Commons','No description provided.','No transcript provided.',33.7746,-84.3964,NULL),(6,'Engineered Biosystems Building (EBB)','No description provided.','No transcript provided.',33.7807,-84.398,NULL),(7,'Fitten, Freeman, and Montag Halls','No description provided.','No transcript provided.',33.778,-84.4041,NULL),(8,'Glenn and Towers','No description provided.','No transcript provided.',33.7733,-84.3913,NULL),(9,'Hinman Building','No description provided.','No transcript provided.',33.7747,-84.395,NULL),(10,'Historic Academy of Medicine','No description provided.','No transcript provided.',33.7784,-84.3867,NULL),(11,'Joseph B. Whitehead Student Health Center','No description provided.','No transcript provided.',33.7748,-84.4029,NULL),(12,'Ken Byers Tennis Complex','No description provided.','No transcript provided.',33.7812,-84.3943,NULL),(13,'Klaus Advanced Computing Building','No description provided.','No transcript provided.',33.7771,-84.3963,NULL),(14,'Marcus Nanotechnology Building','No description provided.','No transcript provided.',33.7788,-84.3985,NULL),(15,'Mason Building','No description provided.','No transcript provided.',33.7766,-84.3988,NULL),(16,'McCamish Pavillion','No description provided.','No transcript provided.',33.7807,-84.3928,NULL),(17,'Mewborn Field','No description provided.','No transcript provided.',33.7793,-84.3932,NULL),(18,'North Avenue Apartments and Dining Hall','No description provided.','No transcript provided.',33.7709,-84.3917,NULL),(19,'Old Civil Engineering Building','No description provided.','No transcript provided.',3.77414,-84.3947,NULL),(20,'Scheller College of Business','No description provided.','No transcript provided.',33.7763,-84.3878,NULL),(21,'Stephen C. Hall Building','No description provided.','No transcript provided.',33.7741,-84.3941,NULL),(22,'Zelnak Basketball Practice Facility','No description provided.','No transcript provided.',33.7799,-84.3923,NULL);
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `users` WRITE;

INSERT INTO `users` VALUES (1,'gtsustain','12345');

UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;