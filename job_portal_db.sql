CREATE DATABASE  IF NOT EXISTS `job_portal` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `job_portal`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: job_portal
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `faculty_user_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `job_id` bigint DEFAULT NULL,
  `cover_letter` varchar(2000) DEFAULT NULL,
  `resume_url` varchar(255) DEFAULT NULL,
  `status` enum('APPLIED','REJECTED','SHORTLISTED') DEFAULT NULL,
  `applied_at` datetime(6) DEFAULT NULL,
  `resume` varchar(255) DEFAULT NULL,
  `faculty_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK46tyx1cr1ejvdawj2kmjbau86` (`faculty_user_id`),
  KEY `FK65weib1lru9dkrbto5pv389vi` (`job_id`),
  KEY `FK8s63uhq2e4bhusqikoqyfwpxn` (`faculty_id`),
  CONSTRAINT `FK46tyx1cr1ejvdawj2kmjbau86` FOREIGN KEY (`faculty_user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK65weib1lru9dkrbto5pv389vi` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`),
  CONSTRAINT `FK8s63uhq2e4bhusqikoqyfwpxn` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (NULL,1,1,NULL,NULL,'SHORTLISTED','2025-10-24 15:16:07.766192','1761299167761_KondaMahesh_Assessment.pdf',1),(NULL,2,3,NULL,NULL,'APPLIED','2025-10-24 18:10:53.675907','1761309653670_KondaMahesh_Assessment.pdf',1),(NULL,3,1,NULL,NULL,'APPLIED','2025-10-26 11:32:08.425177','1761458528421_K_MAHESH_CSE_2024.pdf',6),(NULL,4,1,NULL,NULL,'APPLIED','2025-10-26 11:32:13.081364','1761458533079_K_MAHESH_CSE_2024.pdf',6),(NULL,5,3,NULL,NULL,'APPLIED','2025-10-26 11:37:58.099373','1761458878098_K_MAHESH_CSE_2024.pdf',6),(NULL,6,4,NULL,NULL,'APPLIED','2025-10-26 11:38:29.827330','1761458909825_K_MAHESH_CSE_2024.pdf',6),(NULL,7,5,NULL,NULL,'APPLIED','2025-10-26 11:40:04.952021','1761459004938_K_MAHESH_CSE_2024.pdf',6),(NULL,8,6,NULL,NULL,'APPLIED','2025-10-26 11:41:17.350493','1761459077349_K_MAHESH_CSE_2024.pdf',6);
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colleges`
--

DROP TABLE IF EXISTS `colleges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colleges` (
  `verified` bit(1) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK870y9iwp0upa5iev0lty9abf9` (`user_id`),
  CONSTRAINT `FK4rkdi8nlnwjqs38hsbb44ss0o` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colleges`
--

LOCK TABLES `colleges` WRITE;
/*!40000 ALTER TABLE `colleges` DISABLE KEYS */;
INSERT INTO `colleges` VALUES (_binary '',1,2,'SRM College of Engineering, established in 1998, is an AICTE-approved and NAAC-accredited college offering undergraduate and postgraduate programs in Engineering, Management, and Computer Applications. The campus is equipped with modern laboratories, a digital library, and state-of-the-art infrastructure. The college has strong industry tie-ups and an excellent placement record.','Medchal, Hyderabad, Telangana, 500052','9876543210','SRM College of Engineering');
/*!40000 ALTER TABLE `colleges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `department` varchar(255) DEFAULT NULL,
  `experience` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK3eea1r6n844u6vn4qae7dix4` (`user_id`),
  CONSTRAINT `FKfakwwhqpm5bahy2do8t30j58r` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES (1,'CSE','0','Rajesh','BTECH',4,'Hyderabad','9874563210'),(6,'CSE','0','Krishna','BTECH',6,'Hyderabad','9542312456');
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `deadline` date DEFAULT NULL,
  `college_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(3000) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `experience` varchar(255) DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `salary` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3j76toe669x5xwxi7jpgaq1o8` (`college_id`),
  CONSTRAINT `FK3j76toe669x5xwxi7jpgaq1o8` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES ('2025-11-24',1,1,'We are looking for a passionate and experienced Assistant Professor to join our Computer Science Department. The candidate should have strong academic credentials, research orientation, and excellent communication skills. Responsibilities include teaching undergraduate courses, mentoring students, guiding projects, and contributing to research publications.','Computer Science and Engineering','Minimum 2 years of teaching or research experience','M.Tech / Ph.D in Computer Science or related field','20000','Assistant Professor – Computer Science','active'),('2025-11-24',1,3,'Teach undergraduate and postgraduate courses, supervise projects, conduct research, and guide students.','Computer Science','0-3','PhD/M.Tech in CS','6000','Assistant Professor','active'),('2025-11-24',1,4,'Deliver lectures, prepare assignments, assist in curriculum design, and evaluate student performance.','Mathematics','0-2','M.Sc./M.Phil in Mathematics','50000','Lecturer','active'),('2025-11-24',1,5,'Maintain laboratory equipment, assist students with experiments, and ensure lab safety.','Physics','0-2','M.Sc. in Physics','20000','Lab Instructor','active'),('2025-11-24',1,6,'Assist in ongoing research projects, collect and analyze data, and prepare research reports.','Biotechnology','0-1','M.Sc./B.Tech in Biotechnology','40000','Research Assistant','active');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `enabled` bit(1) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('ROLE_ADMIN','ROLE_COLLEGE','ROLE_FACULTY') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (_binary '',1,'admin@gmail.com','Admin','$2a$10$44.pAnqvmEyohQ/DjT1A..KUM/G4IHFMkVDJvx.Vm32cHRNsKXVK2','ROLE_ADMIN'),(_binary '',2,'srm@gmail.com','SRM College','$2a$10$oblC1rkPmLJkr0cSTWCvKOuGzcMi2QZa.rghA8roGI2Jkt2HT25H.','ROLE_COLLEGE'),(_binary '',4,'rajesh@gmail.com','Rajesh','$2a$10$NhscA9WTsB50dwICaHU1A.2bN8uLClBsorNjFHsxRGnlAcR4tjvpy','ROLE_FACULTY'),(_binary '',6,'krishna@gmail.com','Krishna','$2a$10$Zdt8TZ0QT39CXTs4e5PhPOhm9OTQUyqapvpFST65MC5s7gsGPMadO','ROLE_FACULTY');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-03 18:39:01
