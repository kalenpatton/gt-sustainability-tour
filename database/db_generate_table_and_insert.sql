/* Generates all tables and inserts generic information into them */

/* Table structure for table `locations` */
CREATE DATABASE IF NOT EXISTS location_info;
USE location_info;
DROP TABLE IF EXISTS `locations`;
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

/* Table structure for table `users` */
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `idusers` int NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`idusers`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='users for login\n';

-- -----------------------------------------------------
-- Schema location_info
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `location_info` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `location_info` ;

-- -----------------------------------------------------
-- Table `location_info`.`filters`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `filters`;
CREATE TABLE `location_info`.`filters` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `filter` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
--
-- Data for table `locations`
--
/* Table structure for table `osc_info` */
DROP TABLE IF EXISTS `ocs_info`;
CREATE TABLE `ocs_info` (
  `information` varchar(8000) NOT NULL DEFAULT 'No information provided.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


/* Data for table `locations` */
LOCK TABLES `locations` WRITE;
INSERT INTO `locations` VALUES (1,'Caddell Building','No description provided.','No transcript provided.',33.7767,-84.3969,NULL),(2,'Campus Recreation Center (CRC)','No description provided.','No transcript provided.',33.7755,-84.4034,NULL),(3,'Carbon Neutral Energy Solutions Lab (CNES)','No description provided.','No transcript provided.',33.7709,-84.402,NULL),(4,'Chapin Building','No description provided.','No transcript provided.',33.7733,-84.3953,NULL),(5,'Clough Undergraduate Learning Commons','No description provided.','No transcript provided.',33.7746,-84.3964,NULL),(6,'Engineered Biosystems Building (EBB)','No description provided.','No transcript provided.',33.7807,-84.398,NULL),(7,'Fitten, Freeman, and Montag Halls','No description provided.','No transcript provided.',33.778,-84.4041,NULL),(8,'Glenn and Towers','No description provided.','No transcript provided.',33.7733,-84.3913,NULL),(9,'Hinman Building','No description provided.','No transcript provided.',33.7747,-84.395,NULL),(10,'Historic Academy of Medicine','No description provided.','No transcript provided.',33.7784,-84.3867,NULL),(11,'Joseph B. Whitehead Student Health Center','No description provided.','No transcript provided.',33.7748,-84.4029,NULL),(12,'Ken Byers Tennis Complex','No description provided.','No transcript provided.',33.7812,-84.3943,NULL),(13,'Klaus Advanced Computing Building','No description provided.','No transcript provided.',33.7771,-84.3963,NULL),(14,'Marcus Nanotechnology Building','No description provided.','No transcript provided.',33.7788,-84.3985,NULL),(15,'Mason Building','No description provided.','No transcript provided.',33.7766,-84.3988,NULL),(16,'McCamish Pavillion','No description provided.','No transcript provided.',33.7807,-84.3928,NULL),(17,'Mewborn Field','No description provided.','No transcript provided.',33.7793,-84.3932,NULL),(18,'North Avenue Apartments and Dining Hall','No description provided.','No transcript provided.',33.7709,-84.3917,NULL),(19,'Old Civil Engineering Building','No description provided.','No transcript provided.',3.77414,-84.3947,NULL),(20,'Scheller College of Business','No description provided.','No transcript provided.',33.7763,-84.3878,NULL),(21,'Stephen C. Hall Building','No description provided.','No transcript provided.',33.7741,-84.3941,NULL),(22,'Zelnak Basketball Practice Facility','No description provided.','No transcript provided.',33.7799,-84.3923,NULL);
UNLOCK TABLES;

/* Data for table `users` */
LOCK TABLES `users` WRITE;
ALTER TABLE `users` DISABLE KEYS;
INSERT INTO `users` VALUES (1,'gtsustain','12345');
ALTER TABLE `users` ENABLE KEYS;
UNLOCK TABLES;


LOCK TABLES `filters` WRITE;
ALTER TABLE `filters` DISABLE KEYS;
INSERT INTO `filters` (filter) VALUES ('Energy and Emissions'),('Water'),('Materials Management'),('Built Environment'),('Community and Culture');
ALTER TABLE `filters` ENABLE KEYS;
UNLOCK TABLES;

/* Data for table `ocs_info` */
LOCK TABLES `ocs_info` WRITE;
INSERT INTO `ocs_info` VALUES ('GT Sustainability information goes here wow this default text is super exciting plz replace me');
UNLOCK TABLES;
