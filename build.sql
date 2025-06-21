-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: safe_schema
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `police`
--

DROP TABLE IF EXISTS `police`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `police` (
  `id` int NOT NULL AUTO_INCREMENT,
  `District` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Police_Station` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CR_NO` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Section_of_law` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Crime_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Year` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Accused_Name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Accused_Nick_Name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Accused_Gender` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Guardian` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Accused_Age` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Accused_Address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `police`
--

LOCK TABLES `police` WRITE;
/*!40000 ALTER TABLE `police` DISABLE KEYS */;
INSERT INTO `police` VALUES (1,'Tirupathur','Sendamangalam','158','392 IPC','ROBBERY','2021','venkatesan','NULL','NULL','NULL','42','venkatesan 42/B/39 3rd street Katharpet, Teacher Nagar Thirupathur DT',NULL,'2025-06-10 17:08:55'),(2,'Tirupathur','Sendamangalam','158','392 IPC','ROBBERY','2021','Sudhagar','NULL','NULL','s/o  Deivasigamani ','41','Sudhagar(41) S/O. Deivasigamani Thupalli, Kalanthara,vaniyampadi Thirupathur ',NULL,'2025-06-10 17:08:55'),(3,'Tirupathur','Puduchathram','180','379 IPC','THEFT','2023','ganesan','NULL','NULL','s/o Devan','34','ganesan-34 s/o Devan2, Sunnambukkarar Theru, Dharumarajapuram. Alangayam, Vaniyambadi Thirupathur',NULL,'2025-06-10 17:08:55'),(4,'Tirupathur','Puduchathram','180','379 IPC','THEFT','2023','Selvakumar','NULL','NULL','s/o Renu','28','Selvakumar-28 s/o Renu5, Pudumani Street, Dharumarajapuram.  Alangayam, Vaniyambadi Thirupathur',NULL,'2025-06-10 17:08:55'),(5,'Tirupathur','Mohanur B3 ','664','457, 380 IPC','HB NIGHT ','2021','Arjunan ','NULL','NULL','s/o Mani','36','Arjunan 36/2021 S/o Mani, Kittabaliyanur village, Vellakkalnaththam, Natrampalli (TK), Thirupattur (DT), Thirupattur District',NULL,'2025-06-10 17:08:56'),(6,'Tirupathur','Komarapalayam ','110','392 IPC','Snatching','2012','Madhu ','Koramathu','NULL','s/o Nataraj','29','Madhu @ Koramathu-29, S/o Nataraj, Kottanunallur,Thirupathur',NULL,'2025-06-10 17:08:56'),(7,'Tirupathur','Veppadai ','323','379 IPC  ','Major Theft','2023','Chandru','NULL','NULL','s/o arul','18','chandaru (18), s/o: arul, 83/35, anna nagar, salem main road, thirupathur ',NULL,'2025-06-10 17:08:56'),(8,'Tirupathur','Veppadai ','323','379 IPC  ','Major Theft','2023','ajay','NULL','NULL','s/o arul','19','ajay (19), s/o:arul, 83/35, anna nagar,   salem main road  thirupathur',NULL,'2025-06-10 17:08:56'),(9,'Tirupathur','Komarapalayam','435','457, 380 IPC','HB NIGHT ','2011','Govindasamy','NULL','NULL','s/o Chinnasamy','25','Govindasamy-25 S/o Chinnasamy, Periyakunichi, Tirupathur',NULL,'2025-06-10 17:08:57'),(10,'Tirupathur','Komarapalayam','517','457,380 IPC','HB NIGHT ','2021','Arjunan ','NULL','NULL','s/o Mani  ( late)   ','35','Arjunan -35  s/o Mani  ( late)   Kidapaiyanur Village  vellakkanatham Po  Natrampalli     TK   Triruppathur   Dt',NULL,'2025-06-10 17:08:57'),(11,'Tirupathur','Komarapalayam','592','457,511  IPC','HB NIGHT ','2020','Arjunan ','NULL','NULL','s/o Mani  ( late)   ','35','Arjunan -35  s/o Mani  ( late)   Kidapaiyanur Village  vellakkanatham Po  Natrampalli     TK   Triruppathur   Dt',NULL,'2025-06-10 17:08:57'),(12,'Tirupathur','Komarapalayam ','615','457,380 IPC','HB NIGHT ','2021','Arjunan ','NULL','NULL','s/o Mani  ( late)   ','35','Arjunan -35  s/o Mani  ( late)   Kidapaiyanur Village  vellakkanatham Po  Natrampalli     TK   Triruppathur   Dt',NULL,'2025-06-10 17:08:57'),(13,'Tirupathur','Velagoundampatty  ','39','457,380 IPC','HB NIGHT','2017','Siva','Kumar ','NULL','s/o Ramasamy','46','Siva @ Kumar 46 s/o Ramasamy Kollankottam,Maththurkaruppu, Ambur',NULL,'2025-06-10 17:08:58'),(14,'Tirupathur','Velagoundampatty  ','39','457,380 IPC','HB NIGHT','2017','Venagayam ','NULL','NULL','s/o Kirshnan','53','Venagayam 53 s/o Kirshnan Chettiputhur,Nayakkam Ambur',NULL,'2025-06-10 17:08:58'),(15,'Tirupathur','Velagoundampatty  ','39','457,380 IPC','HB NIGHT','2017','Ithiran ','Magenthiran ','NULL','s/o Natarajan','32','Ithiran @ Magenthiran 32 s/o Natarajan Illangaiakathigal camp, Vennanur, Ambur',NULL,'2025-06-10 17:08:58'),(16,'Tirupathur','Nallur ','35','457, 380 IPC','HB NIGHT','2020','Sankar','NULL','NULL','s/o Ramalingam','30','Sankar(30) S/o Ramalingam Thentharai PeriyaKaliamman Kovil Street Dharapuram, Thiruppur (Dt)',NULL,'2025-06-10 17:08:58'),(17,'Tirupathur','Nallur ','50','380,511 IPC','2W THEFT','2020','Sankar','NULL','NULL','s/o Ramalingam','30','Sankar(30) S/o Ramalingam Thentharai PeriyaKaliamman Kovil Street Dharapuram, Thiruppur (Dt)',NULL,'2025-06-10 17:08:59'),(18,'Tirupathur','Velur ','226','379 IPC','MAJOR THEFT','2023','Amutha','NULL','NULL','w/o. Sakthi','36','Amutha(36), w/o. Sakthi, Thiruppathur',NULL,'2025-06-10 17:08:59'),(19,'Tirupathur','Velur ','226','379 IPC','MAJOR THEFT','2023','Nanthini ','NULL','NULL','w/o. Sakthi','33','Nanthini (33), w/o. sakthi, Avvai nagar, Thiruppathur',NULL,'2025-06-10 17:08:59'),(20,'Pudukottai','Mohanur PS','560','379 IPC','THEFT','2017','Deva','Thiyagarajan ','NULL',' Nagaraj','29','Deva@Thiyagarajan (29) s/oNagaraj, Thirunalur, Periyalur,  Aranthanki, Puthukottai',NULL,'2025-06-10 17:15:02'),(21,'Pudukottai','Mohanur PS','335','454,380 IPC','HB DAY','2013','Selvam','Nodiselvam','NULL','Arumuga','34','Selvam @ Nondiselvam(34), S/O.Arumugam, 240 Suntharanagaygipuram, Thirukattalai, Alangudi, Puthukottai District',NULL,'2025-06-10 17:15:02'),(22,'Pudukottai','Nallipalayam PS','37','454,380 IPC','HB DAY','2024','Arunkumar','NULL','NULL','Lakshmanan','39','Arunkumar-39, s/o Lakshmanan, Aram nagar, LN Puram, Aranthanagi, Pudhukottai,cell',NULL,'2025-06-10 17:15:03'),(23,'Pudukottai','Nallipalayam PS','71','454,380 IPC','HB DAY','2024','Arunkumar','NULL','NULL','Lakshmanan','39','Arunkumar-39, s/o Lakshmanan, Aram nagar, LN Puram, Aranthanagi, Pudhukottai,cell',NULL,'2025-06-10 17:15:03'),(24,'Pudukottai','Nallipalayam PS','184','331(3),305(a) BNS','HB DAY','2024','Arunkumar','NULL','NULL','Lakshmanan','39','Arunkumar-39, s/o Lakshmanan, Aram nagar, LN Puram, Aranthanagi, Pudhukottai,cell',NULL,'2025-06-10 17:15:03'),(25,'Pudukottai','Rasipuram PS','202','379 IPC (Jewel)','MAJOR THEFT ','2015','Chinnaiya','NULL','NULL','Karuppan','65','Chinnaiya-65, S/o.Karuppan, South Santhaipettai, Pudukottai DT',NULL,'2025-06-10 17:15:03'),(26,'Pudukottai','Rasipuram PS','204','392 IPC','ROBBERY','2015','Chinnaiya','NULL','NULL','Karuppan','65','Chinnaiya-65, S/o.Karuppan, South Santhaipettai, Pudukottai DT',NULL,'2025-06-10 17:15:04'),(27,'Pudukottai','Komarapalayam PS','113','448,394 r/w 397 IPC','Snatching','2015','Dhivagar','NULL','NULL','Manoharan','19','Dhivagar- S/o.Manoharan, 19/A-2 North street, Silattur post & village, Aranthangi talk, Pudukottai district.',NULL,'2025-06-10 17:15:04'),(28,'Pudukottai','Jedarpalayam PS','107','457,380 IPC','HB NIGHT','2019','Muthumurugan','NULL','NULL','Manikkam','40','Muthumurugan- 40 S/o Manikkam, pallivasal st, River belt, Pattukottai, Pudhukottai',NULL,'2025-06-10 17:15:04'),(29,'Pudukottai','Jedarpalayam PS','109',' 457,380 IPC','HB NIGHT','2019','Muthumurugan','NULL','NULL','Manikkam','40','Muthumurugan- 40 S/o Manikkam, pallivasal st, River belt, Pattukottai, Pudhukottai',NULL,'2025-06-10 17:15:04'),(30,'Pudukottai','Jedarpalayam PS','109',' 457,380 IPC','HB NIGHT','2019','Muniyandi','NULL','NULL','Ramasamy','42',' Muniyandi-41 S/o Ramasamy, Vagu Thoppu, pallivasal st, River belt, Pattukottai, Pudhukottai',NULL,'2025-06-10 17:15:05'),(31,'Pudukottai','Velur PS','383','457,380 IPC','HB NIGHT','2019','Muniyandi','NULL','NULL','Ramasamy','42',' Muniyandi-41 S/o Ramasamy, Vagu Thoppu, pallivasal st, River belt, Pattukottai, Pudhukottai',NULL,'2025-06-10 17:15:05'),(32,'Pudukottai','Velur PS','383','457,380 IPC','HB NIGHT','2019','Muthumurugan','NULL','NULL','Manikkam','40',' muthumurugan(40), s/o manikkam , pallivasal street, attrankarai pattukottai.PUDUKOTTAI DT',NULL,'2025-06-10 17:15:05'),(33,'Pudukottai','Paramathi PS','304','380 IPC','MAJOR THEFT','2013','Selvam','Nodiselvam','NULL','Arumuga','34','Selvam@MondiSelvam(31/2013), S/O.Arumugam, 240,Sundaranayagipuram, Thirukattalai Post, Alankudi TK, Pudukottai DT',NULL,'2025-06-10 17:15:06'),(34,'Thoothukudi','Nallipalayam','257',' 392 IPC','ROBBERY','2012','David ','NULL','NULL','Gunasingh','22','David (22) s/o Gunasingh, 6/23 Nadu St, Idaiyarkadu, Thiruvaikundam, Tutthukudi Dt',NULL,'2025-06-10 17:16:49'),(35,'Thoothukudi','Nallipalayam','278',' 392 IPC','ROBBERY','2012','David ','NULL','NULL','Gunasingh','22','David (22) s/o Gunasingh, 6/23 Nadu St, Idaiyarkadu, Thiruvaikundam, Tutthukudi Dt',NULL,'2025-06-10 17:16:49'),(36,'Thoothukudi','Nallipalayam','434','392 IPC','ROBBERY','2012','David ','NULL','NULL','Gunasingh','22','David (22) s/o Gunasingh, 6/23 Nadu St, Idaiyarkadu, Thiruvaikundam, Tutthukudi Dt',NULL,'2025-06-10 17:16:49'),(37,'Thoothukudi','Nallipalayam','227','392 IPC','ROBBERY','2013','Raja','Laksumanaraja','NULL','Subramani','24','Raja @ Laksumanaraja(24), S/O.Subramani, South street, Sirugai kuttam, Thuthukudi district',NULL,'2025-06-10 17:16:49'),(38,'Thoothukudi','Nallipalayam','30','379 IPC','THEFT','2024','Kavitha','NULL','NULL','Muthu','38','Kavitha-38 w/o Muthu, Raja gopalnagar, Kovil patti,     Thuthukudi',NULL,'2025-06-10 17:16:50'),(39,'Thoothukudi','Nallipalayam','30','379 IPC','THEFT','2024','Priyadharshini','NULL','NULL','Dhilpkumar','30','Priyadharshini-30 ,w/o Dhilpkumar, Raja gopalnagar, Kovil patti, Thuthukudi',NULL,'2025-06-10 17:16:50'),(40,'Thoothukudi','Nallipalayam','30','379 IPC','THEFT','2024','Velammal','NULL','NULL','Pandit,','47','Velammal-47 ,w/o Pandit,Raja gopalnagar, Kovil patti,  Thuthukudi',NULL,'2025-06-10 17:16:50'),(41,'Thoothukudi','Mohanur ','146','454,380 IPC','HB DAY','2021','Chandraseanr ','Sathiyaraj ','NULL','Dharmendraraju','22','Chandraseanr (a)Sathiyaraj  22S/o. Dharmendraraju,Anthoniyarpuram, Tuticorin',NULL,'2025-06-10 17:16:50'),(42,'Thoothukudi','Sendamangalam','654','457,380 IPC','HB NIGHT','2021','Sarath','Sarthbabukumar','NULL','Chandramohan','30','Sarath @ Sarthbabukumar(30) S/O Chandramohan 498 Elleesh Nagar Housing Board,Madurai Now at  172 Ramarvilai Mattakadai,Thuthukudi ',NULL,'2025-06-10 17:16:51'),(43,'Thoothukudi','Sendamangalam','654','457,380 IPC','HB NIGHT','2021','Vishnu','NULL','NULL','Murugavel','21','Vishnu(21) S/O Murugavel 386 A Jeorge Road VadiSt,GeethaJeevanNagar,Thuthukudi Now at  487 Karupayee Compound   Jeorge Road, GanesapuramThuthukudi',NULL,'2025-06-10 17:16:51'),(44,'Thoothukudi','Sendamangalam','654','457,380 IPC','HB NIGHT','2021','Esakiraja','NULL','NULL','Esaikimuthu','20','Esakiraja(20) S/O Esaikimuthu 1/3 Dhamodaran Nagar Thuthukudi',NULL,'2025-06-10 17:16:51'),(45,'Thoothukudi','Puduchathram','534','457, 511 IPC','HB NIGHT ','2021','Vishnu','NULL','NULL','Murugavel','21','Vishnu-21 s/o Murugavel 386/A, Jargh Road, Vadi street, Geetha Jayam Nagar, Thuthukudi.',NULL,'2025-06-10 17:16:51'),(46,'Thoothukudi','Mohanur','261','457, 380 IPC.','HB NIGHT','2022','Sathesh','NULL','NULL','Raja','31','Sathesh(31)S/o Raja  314,Eswariammankovilstreet, Nedukulam, Sirvelliputhuer, Thoukudi(dt)',NULL,'2025-06-10 17:16:52'),(47,'Thoothukudi','Ayilpatty','18','457,511 IPC','HB NIGHT ','2024','.Manikandan','NULL','NULL','Rajarathinam','31','Manikandan-31 S/O Rajarathinam, D.No.1/83,Theriyur North st,Andivilai,Krishtiyanagaram (Po)Thiruchendur (Tk)Thoothukudi  (DT)',NULL,'2025-06-10 17:16:52'),(48,'Thoothukudi','Ayilpatty','18','457,511 IPC','HB NIGHT ','2024','Parvathimuthu','NULL','NULL','Krishtiyanagaram','25','Parvathimuthu-25 S/O Jayakumar,D.No.1/68,Kamarajar Nagar, Andivilai, Krishtiyanagaram (Po)Thiruchendur (Tk)Thoothukudi  (DT)',NULL,'2025-06-10 17:16:52'),(49,'Thoothukudi','Ayilpatty','18','457,511 IPC','HB NIGHT ','2024','Japakumar','NULL','NULL','Vinsan','24','Japakumar-24 S/O Vinsan,3B,Thanganagaram, Udankudi (Po)Thiruchendur (Tk)Thoothukudi  (DT)',NULL,'2025-06-10 17:16:52'),(50,'Thoothukudi','Ayilpatty','18','457,511 IPC','HB NIGHT ','2024','Suyambulingam','NULL','NULL','Balakrishnan','25','Suyambulingam-25S/O Balakrishnan,1/139,Theriur North street,Udankudi (Po)Thiruchendur (Tk)Thoothukudi  (DT)',NULL,'2025-06-10 17:16:53'),(51,'Thoothukudi','Ayilpatty','18','457,511 IPC','HB NIGHT ','2024','Muruganandam','NULL','NULL','Mookanadar','48','Muruganandam-48, S/O Mookanadar,106,Amman Kovilstreet,Theriyur, Udankudi (Po)Thiruchendur (Tk)ThoothukudiA1 to A5 Arrest and remand 13.02.2024 ',NULL,'2025-06-10 17:16:53'),(52,'Thoothukudi','Ayilpatty','18','457,511 IPC','HB NIGHT ','2024','Ajithkumar','NULL','NULL','Sappanimuthu','24','Ajithkumar-24,S/O Sappanimuthu,9/56 Sottayan street, Arokyapuram (Po)Mappilaiurani (Tk)Thoothukudi  (DT)A6  Arrest and remand 14.02.2024',NULL,'2025-06-10 17:16:53'),(53,'Thoothukudi','Veppadai','116','392 IPC','Snatching','2002','EDWINRAJA','NULL','NULL','RAJAMANI','34','EDWINRAJA (34), S/o: RAJAMANI, D.NO: 3A 185, WEST KAMARAJ NAGAR, MAPPILAI URANI (Po), THOOTHUKUDI (Dt)',NULL,'2025-06-10 17:16:53'),(54,'Thoothukudi','Tiruchengode Rural','101','379 IPC','2w Theft','2022','NLFO Selvakumar','Samuvel','NULL','Arputharaj','34','NLFO Selvakumar @ Samuvel (34), S/o Arputharaj, Perumalpuram, Udankudi, Thuthukudi (Dt)',NULL,'2025-06-10 17:16:54'),(55,'Thoothukudi','Tiruchengode Rural','176','331(4),305 BNS','HB NIGHT ','2024','Maharajan','NULL','NULL','NULL','NULL','Maharajan, 454, Kavudipiraistreet,Kulasekarapattinam, Thiruchendur(TK), Duthukkudi(Dt)',NULL,'2025-06-10 17:16:54'),(56,'Thoothukudi','Komarapalayam','188','457,380 IPC','HB NIGHT ','2019','Murugan','Niravimurugan','NULL','Arumugam','45','Murugan@Niravimurugan-45,S/o Arumugam, Niravi St,Puthiya muthur,Ottapitaram,Tuticorin',NULL,'2025-06-10 17:16:54'),(57,'Thoothukudi','Velur','304','379 IPC','MAJOR THEFT','2022','Kathiresan','NULL','NULL','Iyyappan','49','Kathiresan(49), s/o. Iyyappan, 56, Indhira colony, Thuthukudi.',NULL,'2025-06-10 17:16:55'),(58,'Thoothukudi','Velur','304','379 IPC','MAJOR THEFT','2022','Kathiresan','NULL','NULL','Iyyappan','49','Kathiresan(49), s/o. Iyyappan, 56, Indhira colony, Thuthukudi.',NULL,'2025-06-10 17:16:55'),(59,'Ariyalur','Tiruchengode Town','815/13 ','379 IPC','2w Theft','2013','Selvamani','NIL','M','S/o Ramalingam','29','Selvamani (29) S/o Ramalingam, Road street, Kaduvetti, Ariyalur Dist',NULL,'2025-06-10 17:23:10'),(60,'Ariyalur','Tiruchengode Rural','429/13 ','379 IPC','2w Theft','2013','Selvamani','NIL','M','S/o Ramalingam','29','Selvamani (29) S/o Ramalingam,\nRoad theru, Kaduvetty, Ariyalur Dt',NULL,'2025-06-10 17:23:11'),(61,'Ariyalur','Tiruchengode Rural','236/11 ','457, 511 IPC','HB NIGHT','2011','Sakthi','Sakthivel','M','S/o Kasliyamoorthi','37','Sakthi @ Sakthivel(37), s/o Kasliyamoorthi, Nagamangalam, Ariyalur (Dt)..',NULL,'2025-06-10 17:23:11'),(62,'Chengalpattu','Rasipuram','197/24','304(2) BNS','Snatching','2024','Saran','NIL','M','S/o Sankar','19','2) Saran(19) S/o Sankar, 5, Mariyamman kovil st, Kilaavattam village, Madhuranthagam, Chengalpet',NULL,'2025-06-10 17:23:11'),(65,'erode','erode','26','420 ipc','Domestic Violence','2005','donsekarn','don','Others','therila','19','dfgbfdknh ljkndfbjdyivbfsdmn vsfdgvbnkskbjhbg',NULL,'2025-06-14 07:15:22');
/*!40000 ALTER TABLE `police` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_admin` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `user_role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `case_entry` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `case_view` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `analytics` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `chat` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `updated_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'ns','$2b$10$BC68F3zYb59Tfbsbd7tW1OprYTuWUjrTgwtygKbYEaf8mzEtXZH0i','1','admin','1','1','1','0','admin123','2025-06-13 14:26:05','2025-06-13 11:28:29'),(4,'admin123','$2b$10$UDkD1lEspZ7XQATKPab9zO30BDb.w8jHE6I3jcZHBlQOqQpFbPA.m','0','user','0','0','0','0',NULL,NULL,'2025-06-13 12:08:10'),(5,'hindu','$2b$10$5YRsNJXG3a8AzFqH3vqjeeKltWHCQOLvHdYipQ.qc.DAj9U7dMfFO','1','admin','0','0','0','0',NULL,NULL,'2025-06-13 12:58:14'),(6,'nakeeran','$2b$10$5osLWzMbiBw81RvQ3yglAebgiot6G1ZZIK8gYtZSesDJRKcTGpwyG','0','user','1','1','0','0',NULL,NULL,'2025-06-13 13:51:21');
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

-- Dump completed on 2025-06-21 12:10:04
