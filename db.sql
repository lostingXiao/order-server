-- MySQL dump 10.13  Distrib 8.3.0, for macos14.2 (arm64)
--
-- Host: localhost    Database: orders_db
-- ------------------------------------------------------
-- Server version	8.3.0

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

--
-- Table structure for table `auth`
--

DROP TABLE IF EXISTS `auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth`
--

LOCK TABLES `auth` WRITE;
/*!40000 ALTER TABLE `auth` DISABLE KEYS */;
INSERT INTO `auth` VALUES (1,'店铺选择权限','07539d984e6e27fc','2024-08-06 02:10:45','2024-08-06 02:10:45'),(2,'测试权限1','6ca79936eecdc13e','2024-08-06 02:44:33','2024-08-06 02:44:33'),(3,'测试权限2','3dde3cbd1bebd019','2024-08-06 02:45:19','2024-08-06 02:45:19'),(4,'测试权限3','60dbe21d3fde5c01','2024-08-06 02:45:36','2024-08-06 02:45:36'),(5,'测试权限4','be410300b8e2abd5','2024-08-06 02:45:40','2024-08-06 02:45:40'),(6,'测试权限5','0128530adf6a654c','2024-08-06 02:45:44','2024-08-06 02:45:44'),(7,'测试权限6','c6326e2b9874aef9','2024-08-06 02:45:48','2024-08-06 02:45:48'),(8,'测试权限7','3c8d48093b1d3f7e','2024-08-06 02:45:52','2024-08-06 02:45:52'),(9,'测试权限8','6dc5323a003867f9','2024-08-06 02:45:58','2024-08-06 02:45:58'),(10,'测试权限9','98f2dbe0dbcfa936','2024-08-06 02:46:04','2024-08-06 02:46:04'),(11,'测试权限10','c2f6072d43548dc8','2024-08-06 02:46:10','2024-08-06 02:46:10'),(12,'测试权限11','b588cc06d3b1ffd8','2024-08-06 02:46:16','2024-08-06 02:46:16');
/*!40000 ALTER TABLE `auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `parent_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'首页','/home',NULL,'2024-08-05 04:25:36','2024-08-05 04:25:36'),(3,'店铺','/shop',NULL,'2024-08-05 04:26:27','2024-08-05 04:26:27'),(7,'我的店铺','111',3,'2024-08-06 08:04:25','2024-08-06 08:04:25'),(8,'店铺装修','222',3,'2024-08-06 08:04:38','2024-08-06 08:04:38'),(9,'餐桌','22',3,'2024-08-06 08:04:48','2024-08-06 08:04:48'),(10,'商品','2222',3,'2024-08-06 08:05:27','2024-08-06 08:05:27');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `keyword` varchar(255) NOT NULL,
  `menus` json DEFAULT NULL,
  `permissions` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'222','05fce4ed49d7528f','[]','[]','2024-08-06 08:38:35','2024-08-06 08:38:35'),(2,'222','da77deb7ab75a49e','[]','[]','2024-08-06 08:38:44','2024-08-06 08:38:44'),(3,'系统管理员','3ea43c8efa0f48e9','[1, 7, 8, 9, 10]','[1]','2024-08-08 01:43:26','2024-08-08 01:43:26'),(7,'商家','01109017781d7075','[1, 9, 10]','[]','2024-08-08 01:44:36','2024-08-08 01:44:36'),(8,'运营','432f3a196d2b4be6','[1, 7, 8, 9, 10]','[1]','2024-08-08 03:02:25','2024-08-08 03:02:25');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop`
--

DROP TABLE IF EXISTS `shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shop` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `contact_person` varchar(100) NOT NULL,
  `contact_phone` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop`
--

LOCK TABLES `shop` WRITE;
/*!40000 ALTER TABLE `shop` DISABLE KEYS */;
INSERT INTO `shop` VALUES (1,'测试店铺','http://localhost:5050/images/5f7e0a30e261a5fc463d45f01.png','阿萨德','13222334455','地方根深蒂固','森岛帆高森岛帆高森岛帆高森岛帆高水电费感受到水电费根深蒂固水电费归属感双缝干涉山东分公司','2024-08-08 01:35:15','2024-08-08 01:35:15'),(2,'测试2','http://localhost:5050/images/1ce335027e62d6d3b8f9f1800.jpg','123','13455667788','撒打发斯蒂芬','阿斯顿法师打发斯蒂芬阿斯顿发斯蒂芬阿斯顿发','2024-08-08 01:40:15','2024-08-08 01:40:15'),(3,'小哇塞','http://localhost:5050/images/1ce335027e62d6d3b8f9f1802.jpg','SD','13455667788','aSD啊是的','SD撒大','2024-08-08 01:40:55','2024-08-08 01:40:55'),(4,'小王企鹅','http://localhost:5050/images/1ce335027e62d6d3b8f9f1802.jpg','SD','13455667788','请问饿大法师打发斯蒂芬','阿道夫大V正常v自行车v秩序正常v秩序','2024-08-08 01:41:39','2024-08-08 01:41:39');
/*!40000 ALTER TABLE `shop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `role_id` int NOT NULL,
  `shop_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  KEY `role_id` (`role_id`),
  KEY `shop_id` (`shop_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'管理员1','123456','13222335566',3,NULL,'2024-08-08 07:59:02','2024-08-08 07:59:02'),(2,'运营员工1','123456','18555668899',8,NULL,'2024-08-08 08:13:42','2024-08-08 08:13:42'),(3,'商家用户1','123456','18622335566',7,1,'2024-08-08 08:55:39','2024-08-08 08:55:39');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-09 18:21:11
