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
-- Table structure for table `goods`
--

DROP TABLE IF EXISTS `goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goods` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '图片地址链接',
  `min_quantity` int NOT NULL COMMENT '最小销售数量',
  `price` decimal(10,2) NOT NULL COMMENT '价格',
  `state` tinyint(1) NOT NULL COMMENT '上下架状态（1：上架，0：下架）',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '描述',
  `shop_id` int DEFAULT NULL COMMENT '归属店铺id',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `type_id` int DEFAULT NULL COMMENT '商品种类id',
  PRIMARY KEY (`id`),
  KEY `shop_id` (`shop_id`),
  KEY `fk_goods_type_id` (`type_id`),
  CONSTRAINT `fk_goods_type_id` FOREIGN KEY (`type_id`) REFERENCES `goods_type` (`id`) ON DELETE SET NULL,
  CONSTRAINT `goods_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods`
--

LOCK TABLES `goods` WRITE;
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
INSERT INTO `goods` VALUES (1,'商品1','/images/dbf177c58c1a6eef24f62ea00.png',1,1.00,1,'撒大声地',NULL,'2024-08-13 03:57:05','2024-09-26 06:25:51',NULL),(2,'商品2','/images/dbf177c58c1a6eef24f62ea01.jpg',1,3.00,1,'撒打发斯蒂芬',NULL,'2024-08-13 04:02:40','2024-09-26 06:25:51',NULL),(3,'商品3','/images/ff02458dcb00f23c821882900.jpg',1,4.00,1,'手动阀手动阀',1,'2024-08-13 04:06:14','2024-09-26 06:25:51',NULL),(4,'ssss','/images/020be8eb8f51463fa4bc2f800.png',1,2.00,1,NULL,1,'2024-09-18 09:30:06','2024-09-26 06:25:51',NULL),(5,'测试商品类型','/images/666d2b9eceb3a3a3846411300.png',1,2.50,1,'撒打发擦深V',1,'2024-09-20 07:05:52','2024-09-26 06:25:51',1);
/*!40000 ALTER TABLE `goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods_type`
--

DROP TABLE IF EXISTS `goods_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goods_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `shop_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `shop_id` (`shop_id`),
  CONSTRAINT `goods_type_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods_type`
--

LOCK TABLES `goods_type` WRITE;
/*!40000 ALTER TABLE `goods_type` DISABLE KEYS */;
INSERT INTO `goods_type` VALUES (1,'sss ','null',1,'2024-09-18 07:58:04','2024-09-18 07:58:04'),(2,'测试店铺种类1','null',1,'2024-09-18 08:04:04','2024-09-18 08:04:04'),(3,'eswewe',NULL,1,'2024-09-18 08:19:36','2024-09-18 08:19:36'),(4,'33333',NULL,1,'2024-09-18 08:26:18','2024-09-18 08:26:18'),(5,'wsss',NULL,1,'2024-09-18 08:26:35','2024-09-18 08:53:42'),(6,'dasdasdas','w',1,'2024-09-18 08:54:58','2024-09-18 08:55:49'),(7,'xzczxc222',NULL,1,'2024-09-18 09:07:16','2024-09-18 09:08:56'),(8,'SASASASAS',NULL,3,'2024-09-18 09:25:25','2024-09-18 09:25:25');
/*!40000 ALTER TABLE `goods_type` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'222','05fce4ed49d7528f','[]','[]','2024-08-06 08:38:35','2024-08-06 08:38:35'),(2,'222','da77deb7ab75a49e','[]','[]','2024-08-06 08:38:44','2024-08-06 08:38:44'),(3,'系统管理员','3ea43c8efa0f48e9','[[1], [3, 7], [3, 8], [3, 9], [3, 10]]','[\"07539d984e6e27fc\"]','2024-08-08 01:43:26','2024-08-12 07:42:35'),(7,'商家','01109017781d7075','[1, 9, 10]','[]','2024-08-08 01:44:36','2024-08-08 01:44:36'),(8,'运营','432f3a196d2b4be6','[[1], [3, 7], [3, 8], [3, 9], [3, 10]]','[\"07539d984e6e27fc\"]','2024-08-08 03:02:25','2024-08-12 03:28:29'),(9,'测试角色','f6776a2e6333b052','[]','[]','2024-08-12 06:28:17','2024-08-12 06:29:24'),(10,'','a3e5320455c18e64','[]','[]','2024-08-12 06:28:17','2024-08-12 06:28:17'),(11,'sdasd','82e4c2c5f7d24ad1','[]','[]','2024-08-12 06:30:19','2024-08-12 06:30:19'),(12,'sdasd','582113c753069e85','[]','[]','2024-08-12 06:30:19','2024-08-12 06:30:19'),(13,'122323','de5f8c421df9c378','[]','[]','2024-08-12 06:30:38','2024-08-12 06:30:38'),(14,'122323','e3c5769b73b33596','[]','[]','2024-08-12 06:30:38','2024-08-12 06:30:38'),(15,'11111111','c37359b712228d2f','[]','[]','2024-08-12 06:30:55','2024-08-12 06:30:55'),(16,'11111111','a0968aca15abe083','[]','[]','2024-08-12 06:30:55','2024-08-12 06:30:55'),(17,'444','38f03632b8ceddfd','[]','[]','2024-08-12 06:32:33','2024-08-12 06:32:33'),(18,'444','2d3a1523c9925806','[]','[]','2024-08-12 06:32:33','2024-08-12 06:32:33'),(19,'555','c288b8340e1faf0d','[]','[]','2024-08-12 06:35:27','2024-08-12 06:35:27'),(20,'555','52ae5cea0e4e61f9','[]','[]','2024-08-12 06:35:27','2024-08-12 06:35:27'),(21,'777','8e0f312482792e6c','[]','[]','2024-08-12 06:41:00','2024-08-12 06:41:00'),(22,'777','ede65742f095f690','[]','[]','2024-08-12 06:41:00','2024-08-12 06:41:00'),(23,'888','f206da3e8d2a5651','[]','[]','2024-08-12 06:44:30','2024-08-12 06:44:30'),(24,'888','1d8fd9443c1bb6ca','[]','[]','2024-08-12 06:44:30','2024-08-12 06:44:30'),(25,'999','bd1d8d213bd11738','[]','[]','2024-08-12 06:44:45','2024-08-12 06:44:45'),(26,'999','a1ce4c22aaa61655','[]','[]','2024-08-12 06:44:45','2024-08-12 06:44:45'),(27,'qqq','ca01afb2fa0b63fa','[]','[]','2024-08-12 06:49:00','2024-08-12 06:49:00'),(28,'qqq','1e8697e4ae3959e7','[]','[]','2024-08-12 06:49:00','2024-08-12 06:49:00'),(29,'发发发','7851fc60b37ad1c8','[]','[]','2024-08-12 07:29:25','2024-08-12 07:29:25'),(30,'校验角色','JiF0ZcBH0GM=','[[1], [3, 7], [3, 8], [3, 9], [3, 10]]','[\"07539d984e6e27fc\", \"6ca79936eecdc13e\", \"3dde3cbd1bebd019\", \"60dbe21d3fde5c01\"]','2024-09-26 07:16:58','2024-09-26 07:16:58');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop`
--

LOCK TABLES `shop` WRITE;
/*!40000 ALTER TABLE `shop` DISABLE KEYS */;
INSERT INTO `shop` VALUES (1,'测试店铺','/images/5f7e0a30e261a5fc463d45f01.png','阿萨德','13222334455','地方根深蒂固','森岛帆高森岛帆高森岛帆高森岛帆高水电费感受到水电费根深蒂固水电费归属感双缝干涉山东分公司','2024-08-08 01:35:15','2024-09-26 06:24:33'),(2,'测试2','/images/1ce335027e62d6d3b8f9f1800.jpg','123','13455667788','撒打发斯蒂芬','阿斯顿法师打发斯蒂芬阿斯顿发斯蒂芬阿斯顿发','2024-08-08 01:40:15','2024-09-26 06:24:33'),(3,'小哇塞','/images/1ce335027e62d6d3b8f9f1802.jpg','SD','13455667788','aSD啊是的','SD撒大','2024-08-08 01:40:55','2024-09-26 06:24:33'),(4,'小王企鹅','/images/1ce335027e62d6d3b8f9f1802.jpg','SD','13455667788','请问饿大法师打发斯蒂芬','阿道夫大V正常v自行车v秩序正常v秩序','2024-08-08 01:41:39','2024-09-26 06:24:33'),(5,'奶茶店1','/images/f4e2f3b24a9667956091a4102.jpg','123','13444332255','上档次电子商城真的','阿斯顿法师打发手动阀','2024-08-12 09:16:13','2024-09-26 06:24:33'),(6,'测试icon店铺','/images/b23c6f659b631fa80a049f400.jpeg','123','15666339988','自行车这是大V',NULL,'2024-09-23 10:00:32','2024-09-26 06:24:33');
/*!40000 ALTER TABLE `shop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `table_qrcode`
--

DROP TABLE IF EXISTS `table_qrcode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `table_qrcode` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '餐桌名',
  `seat` int NOT NULL COMMENT '餐桌座位数',
  `qr_code_color` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '#000000' COMMENT '二维码颜色',
  `qr_code_bg_color` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '#FFFFFF' COMMENT '二维码背景色',
  `qr_code_size` int DEFAULT '100' COMMENT '二维码大小',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `shop_id` int DEFAULT NULL,
  `qr_code_icon` tinyint NOT NULL COMMENT '二维码是否包含icon',
  PRIMARY KEY (`id`),
  KEY `shop_id` (`shop_id`),
  CONSTRAINT `table_qrcode_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `table_qrcode`
--

LOCK TABLES `table_qrcode` WRITE;
/*!40000 ALTER TABLE `table_qrcode` DISABLE KEYS */;
INSERT INTO `table_qrcode` VALUES (1,'1号桌',4,'#000000','#ffffff',8,'2024-09-23 05:59:01','2024-09-25 09:53:54',2,0),(2,'2号桌',4,'#000000','#ffffff',8,'2024-09-23 06:02:25','2024-09-25 09:53:45',2,1),(3,'3号桌',4,'#000000','#ffffff',8,'2024-09-23 06:04:09','2024-09-23 06:04:09',2,1),(4,'1号桌',4,'#000000','#ffffff',8,'2024-09-23 07:18:51','2024-09-26 03:03:00',1,1),(5,'2号桌',5,'#a62d2d','#317163',8,'2024-09-23 07:19:12','2024-09-26 03:03:23',1,1),(6,'3号桌',4,'#000000','#ffffff',8,'2024-09-23 07:50:33','2024-09-25 07:52:08',1,1),(7,'4号桌',4,'#000000','#ffffff',8,'2024-09-25 06:48:01','2024-09-25 06:48:01',1,0),(8,'1号桌',4,'#000000','#ffffff',8,'2024-09-25 07:17:04','2024-09-25 07:17:04',3,1),(9,'2号桌',4,'#000000','#ffffff',8,'2024-09-25 07:24:48','2024-09-25 07:24:48',1,0),(10,'2号桌',4,'#000000','#ffffff',8,'2024-09-25 07:25:11','2024-09-25 07:25:11',1,0),(11,'1号桌',4,'#000000','#ffffff',8,'2024-09-25 07:28:35','2024-09-25 07:28:35',1,0),(12,'4号桌',4,'#000000','#ffffff',8,'2024-09-25 07:45:38','2024-09-25 07:45:38',2,0),(13,'8号桌',4,'#000000','#ffffff',8,'2024-09-25 07:52:16','2024-09-25 07:52:16',1,0),(14,'9号桌',4,'#000000','#ffffff',8,'2024-09-25 07:52:54','2024-09-25 07:52:54',1,1),(15,'10号桌',4,'#000000','#ffffff',8,'2024-09-25 07:56:56','2024-09-25 07:56:56',1,0),(16,'5号桌',4,'#000000','#ffffff',8,'2024-09-25 07:58:03','2024-09-25 07:58:03',2,0),(17,'6号桌',4,'#000000','#ffffff',8,'2024-09-25 07:58:28','2024-09-25 07:58:28',2,1),(18,'7号桌',4,'#000000','#ffffff',8,'2024-09-25 07:59:14','2024-09-25 07:59:14',2,1),(19,'8号桌',4,'#000000','#ffffff',8,'2024-09-25 07:59:57','2024-09-25 07:59:57',2,1),(20,'9号桌',4,'#000000','#ffffff',8,'2024-09-25 08:00:45','2024-09-25 08:00:45',2,1),(21,'1号桌',4,'#000000','#ffffff',8,'2024-09-25 09:19:33','2024-09-25 09:19:33',5,1),(22,'2号桌',4,'#000000','#ffffff',8,'2024-09-25 09:40:03','2024-09-25 09:40:03',3,1),(23,'3号桌',4,'#000000','#ffffff',8,'2024-09-25 09:41:57','2024-09-25 09:41:57',3,1),(24,'10号桌',4,'#000000','#ffffff',8,'2024-09-25 09:48:26','2024-09-25 09:48:26',2,0),(25,'11号桌',4,'#000000','#ffffff',8,'2024-09-25 09:49:24','2024-09-25 09:49:24',2,0),(26,'5号桌',4,'#000000','#ffffff',8,'2024-09-25 09:51:13','2024-09-25 09:51:13',3,0),(27,'4号桌',4,'#000000','#ffffff',8,'2024-09-25 09:51:13','2024-09-25 09:51:13',3,1),(28,'6号桌',4,'#431818','#ffffff',8,'2024-09-26 07:26:58','2024-09-26 07:26:58',3,1),(29,'6号桌',4,'#431818','#ffffff',8,'2024-09-26 07:27:50','2024-09-26 07:27:50',3,1),(30,'7号桌',4,'#000000','#ffffff',8,'2024-09-26 07:30:54','2024-09-26 07:30:54',3,1),(31,'7号桌',4,'#000000','#ffffff',8,'2024-09-26 07:31:28','2024-09-26 07:31:28',3,1),(32,'7号桌',4,'#000000','#ffffff',8,'2024-09-26 07:33:02','2024-09-26 07:33:02',3,1),(33,'8号桌',4,'#000000','#ffffff',8,'2024-09-26 07:37:27','2024-09-26 07:37:27',3,1),(34,'8号桌',4,'#000000','#ffffff',8,'2024-09-26 07:37:49','2024-09-26 07:37:49',3,1),(35,'8号桌',4,'#000000','#ffffff',8,'2024-09-26 07:39:38','2024-09-26 07:39:38',3,1),(36,'9号桌',4,'#000000','#ffffff',8,'2024-09-26 07:40:22','2024-09-26 07:40:22',3,1),(37,'10号桌',4,'#1aab51','#ffffff',8,'2024-09-26 07:43:29','2024-09-26 07:43:29',3,1),(38,'12号桌',4,'#b9c93a','#ffffff',8,'2024-09-26 08:01:24','2024-09-26 08:01:24',2,1);
/*!40000 ALTER TABLE `table_qrcode` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'管理员1','123456','13222335566',3,NULL,'2024-08-08 07:59:02','2024-08-08 07:59:02'),(2,'运营员工1','123456','18555668899',8,NULL,'2024-08-08 08:13:42','2024-08-08 08:13:42'),(3,'商家用户1','123456','18622335566',7,1,'2024-08-08 08:55:39','2024-08-08 08:55:39'),(5,'111','123456','18555668811',2,NULL,'2024-08-12 06:47:55','2024-08-12 06:47:55'),(7,'111','123456','15666663333',2,NULL,'2024-08-12 06:48:10','2024-08-12 06:48:10'),(11,'管理员2','123456','15455667781',3,NULL,'2024-08-12 07:31:02','2024-08-12 07:40:25');
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

-- Dump completed on 2024-09-27 18:09:11
