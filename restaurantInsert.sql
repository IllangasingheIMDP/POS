CREATE DATABASE  IF NOT EXISTS `restaurant_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `restaurant_db`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: restaurant_db
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Dumping data for table `cart_item`
--

LOCK TABLES `cart_item` WRITE;
/*!40000 ALTER TABLE `cart_item` DISABLE KEYS */;
INSERT INTO `cart_item` VALUES (2,NULL,2,'session_xyz789',4);
/*!40000 ALTER TABLE `cart_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Fresh fruits and produce','Starters'),(2,'Leafy greens and root vegetables','Breakfast'),(3,'Milk, cheese, and other dairy products','Lunch'),(4,'Bread, cakes, and pastries','Supper'),(5,'Yogurt','Dessert'),(6,'Cola','Beverages');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dining_table`
--

LOCK TABLES `dining_table` WRITE;
/*!40000 ALTER TABLE `dining_table` DISABLE KEYS */;
INSERT INTO `dining_table` VALUES (1,2,'AVAILABLE',101),(2,4,'AVAILABLE',102),(3,6,'RESERVED',103),(4,10,'AVAILABLE',104);
/*!40000 ALTER TABLE `dining_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `inventory_item`
--

LOCK TABLES `inventory_item` WRITE;
/*!40000 ALTER TABLE `inventory_item` DISABLE KEYS */;
INSERT INTO `inventory_item` VALUES (1,'Apple',100,20),(2,'Banana',80,15),(3,'Spinach',50,10),(4,'Milk',60,12),(5,'Bread',40,8),(6,'Kaame',40,60),(7,'',40,20),(8,'Bath',30,4);
/*!40000 ALTER TABLE `inventory_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (1,'2025-05-14 10:06:00.000000',5.7,1,1),(2,'2025-05-14 11:36:00.000000',3,2,2),(3,'2025-05-14 12:11:00.000000',4.8,3,3);
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `menu_item`
--

LOCK TABLES `menu_item` WRITE;
/*!40000 ALTER TABLE `menu_item` DISABLE KEYS */;
INSERT INTO `menu_item` VALUES (1,_binary '','Red Delicious apples','apple.jpg','Apple',2.5,1),(2,_binary '','Fresh bananas','banana.jpg','Banana',1.2,1),(4,_binary '','1 litre whole milk','milk.jpg','Milk',1,3),(5,_binary '','Whole wheat bread loaf','bread.jpg','Bread',2,4),(9,_binary '','sdsds','b7e5e17b-0da5-4a38-a19e-ec800dc5872b_Admin dashboard.png','chicken',12,2),(10,_binary '','sdsds','662f6b83-9c82-4dc4-a2d9-783e17d6fe44_Admin dashboard.png','chicken',12,2),(11,_binary '','dsds','7b06e937-bb2c-4c02-8555-5d31ef78a07c_Admin dashboard.png','chi',12,2),(15,_binary '','fssd','8c409c17-9c71-41cf-9f3b-c6a452c2b70e_tas1.png','fdfd',34,4),(16,_binary '','food','46013652-2d50-4e82-b4e5-7aad8a5373de_vecteezy_cute-cartoon-green-leaf-character-with-happy-expression-in_8106483.jpg','Chicken',55,2),(17,_binary '','dsdsd','5bc27f20-17e6-4b08-8715-eb615e36d92d_Screenshot (5).png','dsds',445,6),(18,_binary '','dsds','49697d5c-9e2b-4441-aa83-12603328aa9c_Screenshot (25).png','v',44,2),(19,_binary '','dsd','8462984f-0567-4f85-8455-54f735e6d59f_photo_2024-10-26_22-03-56.jpg','ds',22,2),(20,_binary '','dxdsd','4a259db5-82a6-44bf-8a28-dc1fc72ebe25_Screenshot (6).png','dsdsd',5454,2),(21,_binary '','dfd','b2467274-693f-46f2-ba8f-add5320136e1_Screenshot (3).png','ttt',443,2),(22,_binary '','Kannna rahai','7bb4a34c-9383-4148-9a46-c2df30643052_photo_2024-10-26_22-03-56.jpg','Naan',45,2);
/*!40000 ALTER TABLE `menu_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (1,2.5,2,1,1),(2,1.2,1,2,1),(3,2,1,5,2),(5,2.4,2,2,4),(6,44,1,18,4),(7,890,2,17,5),(8,12,1,9,5),(9,2.4,2,2,6);
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2025-05-14 10:00:00.000000','Rahul Kumar','DINE_IN','COMPLETED',101,5.7),(2,'2025-05-14 11:30:00.000000','Priya Singh','TAKEAWAY','COMPLETED',NULL,3),(3,'2025-05-14 12:00:00.000000','Amit Patel','DELIVERY','PREPARING',NULL,4.8),(4,'2025-05-15 21:48:38.103069','Dasun','DINE_IN','COMPLETED',99,46.4),(5,'2025-05-15 21:50:24.130074','Dasun','DINE_IN','COMPLETED',101,902),(6,'2025-05-16 00:27:38.354100','Heshan','DINE_IN','COMPLETED',101,2.4);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,5.7,'CASH','2025-05-14 10:05:00.000000',1),(2,3,'CARD','2025-05-14 11:35:00.000000',2),(3,4.8,'ONLINE','2025-05-14 12:10:00.000000',3);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES (1,'9001122334','Suresh Mehta','2025-05-15',2,'PENDING','13:00:00.000000',1),(2,'9112233445','Rita Sharma','2025-05-15',4,'CONFIRMED','14:00:00.000000',3),(3,'sdsd','Dasundasun','2025-05-16',1,'PENDING','16:01:00.000000',1),(4,'5','Kasun','2025-05-17',1,'PENDING','19:42:00.000000',2),(5,'0711940579','Dasun Illangasinghe','2025-05-16',0,'PENDING','14:15:00.000000',1);
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'9876543210','John Doe','Cashier'),(2,'9123456789','Jane Smith','Stock Manager'),(3,'9988776655','Alice Brown','Store Assistant');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,_binary '\0','$2a$12$qTI51dzxgKS2hUffzJ7qqOjd95elwB210k7T5vNBv7xWQ8xmK.MX.','ADMIN','admin'),(2,_binary '\0','$2a$12$Nz8MzFG.A3vhIqW2qc6ek.Ww/fwS4fZS9cULoPJXSAHa6WR/AbXIq','CHEF','chef'),(3,_binary '\0','$2a$12$A8nfTftDgxFXZnDT1gRM4.VMIMROEL4kA8nlZaSIq9vuY7y8SOvuS','CASHIER','cashier'),(5,_binary '','$2a$10$DBW4phfimQgaL8/yEdTc3OWVOesazgedbG2pnwql1xGVHR71eKb32','CHEF','chef2');
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

-- Dump completed on 2025-05-16  2:20:29
